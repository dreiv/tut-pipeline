// src/test/msw-interceptor.ts
const isBrowser = typeof window !== 'undefined' && !!window.navigator.serviceWorker

export async function getInterceptor() {
  if (isBrowser) {
    const { worker } = await import('../mocks/browser')
    return {
      instance: worker,
      start: () => worker.start({ onUnhandledRequest: 'warn' }),
      stop: () => worker.stop(),
    }
  } else {
    const { server } = await import('../mocks/node')
    return {
      instance: server,
      start: () => server.listen({ onUnhandledRequest: 'warn' }),
      stop: () => server.close(),
    }
  }
}
