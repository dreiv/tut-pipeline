import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { getInterceptor } from './msw-interceptor'

const interceptor = await getInterceptor()

beforeAll(async () => {
  await interceptor.start()
})

afterEach(() => {
  interceptor.instance.resetHandlers()

  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.clearAllMocks()
})

afterAll(async () => {
  await interceptor.stop()
})
