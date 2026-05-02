import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import MainLayout from './MainLayout.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home Page Content</div>' } },
    { path: '/favorites', component: { template: '<div>Favorites Page Content</div>' } },
    { path: '/my-team', component: { template: '<div>Team Page Content</div>' } },
  ],
})

describe('MainLayout', () => {
  it('renders the logo and nav items with correct accessibility roles', async () => {
    const screen = render(MainLayout, { global: { plugins: [router] } })

    const header = screen.getByRole('banner')
    const nav = screen.getByRole('navigation')

    await expect.element(header.getByText('Poke')).toBeVisible()

    await expect.element(nav.getByRole('link', { name: /favorites/i })).toBeVisible()
    await expect.element(nav.getByRole('link', { name: /my team/i })).toBeVisible()
  })

  it('navigates and renders route content inside the layout', async () => {
    const screen = render(MainLayout, { global: { plugins: [router] } })

    await router.push('/')
    await expect.element(screen.getByText('Home Page Content')).toBeVisible()

    const favoritesLink = screen.getByRole('link', { name: /favorites/i })
    await favoritesLink.click()

    await expect.element(screen.getByText('Favorites Page Content')).toBeVisible()
  })

  it('displays the footer with the correct copyright year', async () => {
    const currentYear = new Date().getFullYear().toString()
    const screen = render(MainLayout, { global: { plugins: [router] } })

    const footer = screen.getByRole('contentinfo')
    await expect.element(footer.getByText(new RegExp(currentYear))).toBeVisible()
  })

  it('does not show the favorite badge when count is zero', async () => {
    const screen = render(MainLayout, { global: { plugins: [router] } })

    const badge = screen.getByText(/^\d+$/)
    await expect.element(badge).not.toBeInTheDocument()
  })
})
