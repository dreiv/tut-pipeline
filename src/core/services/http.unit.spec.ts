import { describe, expect, it, vi, beforeEach } from 'vitest'
import { http as api } from './http'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/node'

describe('http utility', () => {
  const TEST_BASE = 'http://localhost:3000'

  beforeEach(() => {
    vi.stubEnv('VITE_API_URL', TEST_BASE)
  })

  describe('URL Construction', () => {
    it('should construct the correct URL with simple query parameters', async () => {
      let interceptedUrl = ''

      server.use(
        http.get(`${TEST_BASE}/resource`, ({ request }) => {
          interceptedUrl = request.url
          return HttpResponse.json({ data: 'success' })
        }),
      )

      await api.get('/resource', { id: '123', status: 'active' })

      const url = new URL(interceptedUrl)
      expect(url.searchParams.get('id')).toBe('123')
      expect(url.searchParams.get('status')).toBe('active')
    })

    it('should correctly serialize array parameters', async () => {
      let interceptedUrl = ''

      server.use(
        http.get(`${TEST_BASE}/list`, ({ request }) => {
          interceptedUrl = request.url
          return HttpResponse.json({ data: 'success' })
        }),
      )

      await api.get('/list', { tags: ['a', 'b'], limit: 10 })

      const url = new URL(interceptedUrl)
      expect(url.searchParams.getAll('tags')).toEqual(['a', 'b'])
      expect(url.searchParams.get('limit')).toBe('10')
    })

    it('should ignore undefined parameters', async () => {
      let interceptedUrl = ''

      server.use(
        http.get(`${TEST_BASE}/filter`, ({ request }) => {
          interceptedUrl = request.url
          return HttpResponse.json({ data: 'success' })
        }),
      )

      await api.get('/filter', { valid: 'yes', invalid: undefined })

      const url = new URL(interceptedUrl)
      expect(url.searchParams.get('valid')).toBe('yes')
      expect(url.searchParams.has('invalid')).toBe(false)
    })
  })

  describe('Headers', () => {
    it('should include default JSON headers and custom headers', async () => {
      let interceptedHeaders: Headers | null = null

      server.use(
        http.get(`${TEST_BASE}/headers`, ({ request }) => {
          interceptedHeaders = request.headers
          return HttpResponse.json({ data: 'success' })
        }),
      )

      await api.get('/headers', {}, { headers: { 'X-Test': 'val' } })

      expect(interceptedHeaders!.get('Content-Type')).toBe('application/json')
      expect(interceptedHeaders!.get('Accept')).toBe('application/json')
      expect(interceptedHeaders!.get('X-Test')).toBe('val')
    })
  })

  describe('HTTP Methods', () => {
    it('should stringify the body and use POST method', async () => {
      let method = ''
      let body: any = null

      const payload = { foo: 'bar' }

      server.use(
        http.post(`${TEST_BASE}/submit`, async ({ request }) => {
          method = request.method
          body = await request.json()
          return HttpResponse.json({ data: 'success' })
        }),
      )

      await api.post('/submit', payload)

      expect(method).toBe('POST')
      expect(body).toEqual(payload)
    })
  })

  describe('Error Handling', () => {
    it('should throw an error with message from server', async () => {
      server.use(
        http.get(`${TEST_BASE}/fail`, () => {
          return HttpResponse.json({ message: 'Custom Server Error' }, { status: 400 })
        }),
      )

      await expect(api.get('/fail')).rejects.toThrow('Custom Server Error')
    })

    it('should fallback to status text if json body has no message', async () => {
      server.use(
        http.get(`${TEST_BASE}/fail-empty`, () => {
          return new HttpResponse(JSON.stringify({}), {
            status: 500,
            statusText: 'Internal Server Error',
          })
        }),
      )

      await expect(api.get('/fail-empty')).rejects.toThrow('HTTP 500: Internal Server Error')
    })

    it('should return an empty object for 204 No Content', async () => {
      server.use(
        http.get(`${TEST_BASE}/no-content`, () => {
          return new HttpResponse(null, { status: 204 })
        }),
      )

      const result = await api.get('/no-content')
      expect(result).toEqual({})
    })
  })
})
