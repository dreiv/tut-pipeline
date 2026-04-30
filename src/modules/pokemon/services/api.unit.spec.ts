import { describe, it, expect, vi, beforeEach } from 'vitest'
import { pokemonService } from './api'
import { http } from '@/core/services/http'
import { parse } from 'valibot'

vi.mock('@/core/services/http')
vi.mock('valibot', async (importOriginal) => {
  const actual = await importOriginal<typeof import('valibot')>()
  return {
    ...actual,
    parse: vi.fn<typeof parse>(),
  }
})

describe('pokemonService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getById', () => {
    it('should fetch a pokemon and parse the result', async () => {
      const mockRawData = { id: 1, name: 'bulbasaur' }
      const mockParsedData = { ...mockRawData, height: 7, weight: 69 }

      vi.mocked(http.get).mockResolvedValue(mockRawData)
      vi.mocked(parse).mockReturnValue(mockParsedData)

      const result = await pokemonService.getById(1)

      expect(http.get).toHaveBeenCalledWith('/pokemon/1')
      expect(parse).toHaveBeenCalledWith(expect.any(Object), mockRawData)
      expect(result).toEqual(mockParsedData)
    })
  })

  describe('list', () => {
    it('should fetch a paginated list with correct params', async () => {
      const mockList = { count: 1, results: [{ name: 'bulbasaur', url: '...' }] }
      vi.mocked(http.get).mockResolvedValue(mockList)

      const result = await pokemonService.list(20, 10)

      expect(http.get).toHaveBeenCalledWith('/pokemon', { offset: 20, limit: 10 })
      expect(result).toEqual(mockList)
    })

    it('should use default pagination values', async () => {
      await pokemonService.list()
      expect(http.get).toHaveBeenCalledWith('/pokemon', { offset: 0, limit: 20 })
    })
  })

  describe('getSpecies', () => {
    it('should fetch species data and parse it', async () => {
      const mockData = { name: 'bulbasaur', flavor_text_entries: [] }
      vi.mocked(http.get).mockResolvedValue(mockData)
      vi.mocked(parse).mockReturnValue(mockData)

      await pokemonService.getSpecies('bulbasaur')

      expect(http.get).toHaveBeenCalledWith('/pokemon-species/bulbasaur')
      expect(parse).toHaveBeenCalled()
    })
  })

  describe('getEvolutionChain', () => {
    it('should fetch evolution chain data and parse it', async () => {
      const mockData = { id: 123, chain: {} }
      vi.mocked(http.get).mockResolvedValue(mockData)
      vi.mocked(parse).mockReturnValue(mockData)

      await pokemonService.getEvolutionChain(123)

      expect(http.get).toHaveBeenCalledWith('/evolution-chain/123')
      expect(parse).toHaveBeenCalled()
    })
  })

  describe('Validation Failures', () => {
    it('should throw if the schema validation fails', async () => {
      vi.mocked(http.get).mockResolvedValue({ wrong: 'data' })
      // Simulate Valibot throwing a validation error
      vi.mocked(parse).mockImplementation(() => {
        throw new Error('Valibot Error')
      })

      await expect(pokemonService.getById(1)).rejects.toThrow('Valibot Error')
    })
  })
})
