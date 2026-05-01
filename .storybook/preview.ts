import type { Preview } from '@storybook/vue3-vite'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from '../src/mocks/handlers'

import '../src/assets/style.css'

initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    msw: { handlers },
  },
  loaders: [mswLoader],
}

export default preview
