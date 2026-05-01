import { createApp } from 'vue'
import '@/assets/style.css'

import App from './App.vue'
import router from './router'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')

    // onUnhandledRequest: 'bypass' ensures real
    // assets (images/css) don't clutter your console
    return worker.start({ onUnhandledRequest: 'bypass' })
  }
}

enableMocking().then(() => {
  createApp(App).use(router).mount('#app')
})
