interface HttpOptions extends RequestInit {
  params?: Record<string, string | number | string[] | number[] | undefined>
}

async function request<T>(endpoint: string, options: HttpOptions = {}): Promise<T> {
  const { params, headers: customHeaders, ...fetchOptions } = options

  const baseUrl = import.meta.env.VITE_API_URL || ''

  const url = new URL(
    endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`,
    'http://localhost',
  )

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)))
      } else {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customHeaders,
    },
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody.message || `HTTP ${response.status}: ${response.statusText}`)
  }

  return response.status === 204 ? ({} as T) : response.json()
}

export const http = {
  get: <T>(url: string, params?: HttpOptions['params'], options?: Omit<HttpOptions, 'params'>) =>
    request<T>(url, { ...options, method: 'GET', params }),

  post: <T>(url: string, data?: unknown, options?: HttpOptions) =>
    request<T>(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
}
