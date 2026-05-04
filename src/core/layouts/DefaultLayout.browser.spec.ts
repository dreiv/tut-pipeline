import { expect, it, describe, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import DefaultLayout from './DefaultLayout.vue'

vi.mock('../components/NavBar.vue', () => ({
  default: {
    template:
      '<nav role="navigation"><a href="/favorites">Favorites</a><a href="/my-team">My Team</a></nav>',
  },
}))

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home Page Content</div>' } },
    { path: '/favorites', component: { template: '<div>Favorites Page Content</div>' } },
    { path: '/my-team', component: { template: '<div>Team Page Content</div>' } },
  ],
})

describe('DefaultLayout', () => {
  it('renders the layout structure and navigation mock', async () => {
    const screen = render(DefaultLayout, {
      global: {
        plugins: [router],
      },
    })

    const main = screen.getByRole('main')
    await expect.element(main).toBeVisible()

    const nav = screen.getByRole('navigation')
    await expect.element(nav.getByRole('link', { name: /favorites/i })).toBeVisible()
  })

  it('provides the main content area for router views', async () => {
    const screen = render(DefaultLayout, {
      global: {
        plugins: [router],
      },
    })

    await router.push('/')
    await expect.element(screen.getByText('Home Page Content')).toBeVisible()
  })

  it('renders the footer with the dynamic year', async () => {
    const currentYear = new Date().getFullYear().toString()
    const screen = render(DefaultLayout, {
      global: {
        plugins: [router],
      },
    })

    const footer = screen.getByRole('contentinfo')
    await expect.element(footer.getByText(new RegExp(currentYear))).toBeVisible()
  })
})
