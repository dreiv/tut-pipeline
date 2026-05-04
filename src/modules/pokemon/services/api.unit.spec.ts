import { describe, it, expect } from 'vitest'
import { pokemonService } from './api'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/node'

describe('pokemonService', () => {
  const API_BASE = 'https://pokeapi.co/api/v2'

  describe('getById', () => {
    it('should fetch a pokemon and return the validated result', async () => {
      const mockRawData = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        stats: [{ base_stat: 45, stat: { name: 'hp' } }],
        sprites: {
          front_default: 'https://...',
          other: {
            'official-artwork': {
              front_default: 'https://...',
            },
          },
        },
        types: [{ type: { name: 'grass' } }],
      }

      server.use(
        http.get(`${API_BASE}/pokemon/1`, () => {
          return HttpResponse.json(mockRawData)
        }),
      )

      const result = await pokemonService.getById(1)

      expect(result.id).toBe(1)
      expect(result.name).toBe('bulbasaur')
      expect(result.sprites.other['official-artwork'].front_default).toBeDefined()
    })
  })

  describe('list', () => {
    it('should fetch a paginated list with correct params and manual image construction', async () => {
      let capturedUrl: URL | undefined

      server.use(
        http.get(`${API_BASE}/pokemon`, ({ request }) => {
          capturedUrl = new URL(request.url)
          return HttpResponse.json({
            count: 1,
            results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
          })
        }),
      )

      const result = await pokemonService.list(20, 10)

      expect(capturedUrl!.searchParams.get('offset')).toBe('20')
      expect(capturedUrl!.searchParams.get('limit')).toBe('10')
      expect(result.results[0]!.id).toBe(1)
      expect(result.results[0]!.image).toContain('1.png')
    })

    it('should use default pagination values', async () => {
      let capturedUrl: URL | undefined

      server.use(
        http.get(`${API_BASE}/pokemon`, ({ request }) => {
          capturedUrl = new URL(request.url)
          return HttpResponse.json({ count: 0, results: [] })
        }),
      )

      await pokemonService.list()

      expect(capturedUrl!.searchParams.get('offset')).toBe('0')
      expect(capturedUrl!.searchParams.get('limit')).toBe('20')
    })
  })

  describe('Validation Failures', () => {
    it('should throw if the schema validation fails', async () => {
      server.use(
        http.get(`${API_BASE}/pokemon/1`, () => {
          return HttpResponse.json({ id: 'not-a-number' })
        }),
      )

      await expect(pokemonService.getById(1)).rejects.toThrow(/Invalid type|ValiError/)
    })
  })
})
