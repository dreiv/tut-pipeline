import { test as base, expect } from '@playwright/test'

import { handlers } from '../src/mocks/handlers.js'
import { AxeBuilder } from '@axe-core/playwright'

type MyFixtures = {
  makeAxeBuilder: () => AxeBuilder
}

export const test = base.extend<MyFixtures>({
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

    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (
        msg.type() === 'error' &&
        (msg.text().includes('hydration') || msg.text().includes('mismatch'))
      ) {
        consoleErrors.push(msg.text())
      }
    })

    await use(page)

    expect(consoleErrors, `Hydration mismatch detected: ${consoleErrors.join(', ')}`).toHaveLength(
      0,
    )
  },

  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .disableRules(['color-contrast'])
        .exclude('.vue-devtools__anchor-btn') // Ignore devtools

    await use(makeAxeBuilder)
  },
})

export { expect }
