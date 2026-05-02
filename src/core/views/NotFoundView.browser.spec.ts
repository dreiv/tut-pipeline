import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import NotFoundView from './NotFoundView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: 'Home' } }],
})

describe('NotFoundView', () => {
  it('renders the 404 status and Poke-themed error messages', async () => {
    const screen = render(NotFoundView, {
      global: { plugins: [router] },
    })

    await expect.element(screen.getByText('STATUS_404')).toBeVisible()
    await expect.element(screen.getByText(/Lost in the tall grass/i)).toBeVisible()
    await expect.element(screen.getByText(/back to safety/i)).toBeVisible()
  })

  it('contains a functional link back to the home page', async () => {
    const screen = render(NotFoundView, {
      global: { plugins: [router] },
    })

    const link = screen.getByRole('link', { name: /back to safety/i })

    await expect.element(link).toHaveAttribute('href', '/')

    await link.click()
  })

  it('applies the centering and layout classes correctly', async () => {
    const screen = render(NotFoundView, {
      global: { plugins: [router] },
    })

    const container = screen.getByTestId('not-found-container')

    await expect.element(container).toHaveClass('m-auto')
    await expect.element(container).toHaveClass('flex-col')
  })

  it('displays the thinking emoji with the correct styles', async () => {
    const screen = render(NotFoundView, {
      global: { plugins: [router] },
    })

    const emoji = screen.getByText('🤔')
    await expect.element(emoji).toBeVisible()
    await expect.element(emoji).toHaveClass('text-7xl')
  })
})
