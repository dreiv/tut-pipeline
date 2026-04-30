import { vi } from 'vitest'

export const http = {
  get: vi.fn<(url: string, params?: any) => Promise<any>>(),
  post: vi.fn<(url: string, data: any) => Promise<any>>(),
}
