import { beforeEach, describe, expect, it, vi } from 'vitest'
import { http } from './http'

const mockFetch = vi.fn<typeof globalThis.fetch>()
vi.stubGlobal('fetch', mockFetch)

describe('http utility', () => {
  const BASE_URL = import.meta.env.VITE_API_URL || ''

  beforeEach(() => {
    vi.clearAllMocks()

    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ data: 'success' }), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      }),
    )
  })

  describe('URL Construction', () => {
    it('should concatenate BASE_URL and endpoint directly', async () => {
      await http.get('/test-endpoint')
      const url = mockFetch.mock.calls[0]![0]
      expect(url).toBe(`${BASE_URL}/test-endpoint`)
    })

    it('should construct the correct URL with simple query parameters', async () => {
      await http.get('/resource', { id: '123', status: 'active' })
      const url = mockFetch.mock.calls[0]![0]
      expect(url).toBe(`${BASE_URL}/resource?id=123&status=active`)
    })

    it('should correctly serialize array parameters using append', async () => {
      await http.get('/list', { tags: ['a', 'b'], limit: 10 })
      const url = mockFetch.mock.calls[0]![0] as string

      expect(url).toContain('tags=a')
      expect(url).toContain('tags=b')
      expect(url).toContain('limit=10')
    })

    it('should ignore undefined parameters', async () => {
      await http.get('/filter', { valid: 'yes', invalid: undefined })
      const url = mockFetch.mock.calls[0]![0] as string
      expect(url).toContain('?valid=yes')
      expect(url).not.toContain('invalid')
    })
  })

  describe('Headers', () => {
    it('should include default JSON headers', async () => {
      await http.get('/headers')

      const callOptions = mockFetch.mock.calls[0]![1]
      const headers = callOptions!.headers as Headers

      expect(headers.get('Content-Type')).toBe('application/json')
      expect(headers.get('Accept')).toBe('application/json')
    })

    it('should allow overriding or adding custom headers', async () => {
      await http.get('/custom-headers', {}, { headers: { 'X-Test': 'val' } })

      const callOptions = mockFetch.mock.calls[0]![1]
      const headers = callOptions!.headers as Headers
      expect(headers.get('X-Test')).toBe('val')
    })
  })

  describe('HTTP Methods', () => {
    it('should use GET method for get calls', async () => {
      await http.get('/method')
      expect(mockFetch.mock.calls[0]![1]!.method).toBe('GET')
    })

    it('should stringify the body and use POST method for post calls', async () => {
      const payload = { foo: 'bar' }
      await http.post('/submit', payload)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(payload),
        }),
      )
    })
  })

  describe('Error Handling', () => {
    it('should throw an error with message from server if response is not ok', async () => {
      // Simulate 400 Bad Request with a JSON body
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({ message: 'Server side error' }), {
          status: 400,
          statusText: 'Bad Request',
        }),
      )

      // Added specific error message check to satisfy eslint-plugin-jest
      await expect(http.get('/fail')).rejects.toThrow(/Server side error/)
    })

    it('should fallback to status text if json body has no message', async () => {
      // Simulate 500 with empty JSON
      mockFetch.mockResolvedValue(
        new Response(JSON.stringify({}), {
          status: 500,
          statusText: 'Internal Server Error',
        }),
      )

      await expect(http.get('/fail')).rejects.toThrow(/HTTP 500: Internal Server Error/)
    })

    it('should return an empty object for 204 No Content', async () => {
      // 204 No Content usually has no body
      mockFetch.mockResolvedValue(
        new Response(null, {
          status: 204,
          statusText: 'No Content',
        }),
      )

      const result = await http.get('/no-content')
      expect(result).toEqual({})
    })
  })
})
