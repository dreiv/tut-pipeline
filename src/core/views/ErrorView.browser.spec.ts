import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import ErrorView from './ErrorView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: 'Home' } }],
})

describe('ErrorView', () => {
  it('renders default error state correctly', async () => {
    const screen = render(ErrorView, {
      global: { plugins: [router] },
    })

    await expect.element(screen.getByText('CODE_500')).toBeVisible()
    await expect.element(screen.getByText(/Something went wrong/i)).toBeVisible()

    const link = screen.getByRole('link', { name: /return to safety/i })
    await expect.element(link).toBeVisible()
    await expect.element(link).toHaveAttribute('href', '/')
  })

  it('renders custom error codes and messages', async () => {
    const screen = render(ErrorView, {
      global: { plugins: [router] },
      props: {
        code: 404,
        message: 'This Pokemon has escaped into the wild.',
      },
    })

    await expect.element(screen.getByText('CODE_404')).toBeVisible()
    await expect.element(screen.getByText('This Pokemon has escaped into the wild.')).toBeVisible()
  })
})
