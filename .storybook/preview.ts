import { setup } from '@storybook/vue3'
import type { Preview } from '@storybook/vue3-vite'
import { createMemoryHistory, createRouter } from 'vue-router'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from '../src/mocks/handlers'

import '../src/assets/style.css'

initialize({ onUnhandledRequest: 'bypass' })

const MockComp = { template: '<div/>' }
const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: MockComp },
    { path: '/favorites', name: 'favorites', component: MockComp },
    { path: '/my-team', name: 'my-team', component: MockComp },
    { path: '/:catchAll(.*)*', name: 'not-found', component: MockComp },
  ],
})

setup((app) => {
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
