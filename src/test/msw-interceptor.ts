const isBrowser = typeof window !== 'undefined' && !!window.navigator.serviceWorker

export async function getInterceptor() {
  if (isBrowser) {
    const { worker } = await import('../mocks/browser')
    return {
      instance: worker,
      start: () => worker.start({ onUnhandledRequest: 'error' }),
      stop: () => worker.stop(),
    }
  } else {
    const { server } = await import('../mocks/node')
    return {
      instance: server,
      start: () => server.listen({ onUnhandledRequest: 'error' }),
      stop: () => server.close(),
    }
  }
}
