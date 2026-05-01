import { test as base, expect } from '@playwright/test'
import { handlers } from '../src/mocks/handlers.js'

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/pokemon/**', async (route) => {
      const playwrightRequest = route.request()
      const requestBody = playwrightRequest.postDataBuffer()

      const webRequest = new Request(playwrightRequest.url(), {
        method: playwrightRequest.method(),
        headers: playwrightRequest.headers(),
        body: requestBody ? new Uint8Array(requestBody) : undefined,
      })

      let response: Response | undefined
      for (const handler of handlers) {
        const match = await handler.test({ request: webRequest })
        if (match) {
          const result = await handler.run({
            request: webRequest,
            requestId: crypto.randomUUID(),
          })
          response = result?.response
          break
        }
      }

      if (response) {
        const responseArrayBuffer = await response.arrayBuffer()
        await route.fulfill({
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          body: Buffer.from(responseArrayBuffer),
        })
      } else {
        await route.continue()
      }
    })

    await use(page)
  },
})

export { expect }
