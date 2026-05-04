/* eslint-disable @typescript-eslint/no-explicit-any */

import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3-vite'
import { createMemoryHistory, createRouter } from 'vue-router'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { createTestingPinia } from '@pinia/testing'
import { handlers } from '../src/mocks/handlers'
import { Routes } from '../src/router'
import '../src/assets/style.css'

initialize({ onUnhandledRequest: 'bypass' })

const simpleSpy = () => () => {}

const MockComp = { template: '<div></div>' }
const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: Routes.HOME, component: MockComp },
    { path: '/favorites', name: Routes.FAVORITES, component: MockComp },
    { path: '/my-team', name: Routes.MY_TEAM, component: MockComp },
    { path: '/pokemon/:id', name: Routes.POKEMON_DETAIL, component: MockComp },
    { path: '/:catchAll(.*)*', name: 'not-found', component: MockComp },
  ],
})

setup((app) => {
  app.use(
    createTestingPinia({
      createSpy: simpleSpy,
      stubActions: false,
      ...({ devtoolsConfig: { enabled: false } } as any),
    }),
  )
  app.use(mockRouter)
})

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    msw: { handlers },
  },
  loaders: [mswLoader],
}

export default preview
