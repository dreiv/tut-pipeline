import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import NavBar from './NavBar.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: 'Home' } },
    { path: '/favorites', name: 'favorites', component: { template: 'Favorites' } },
    { path: '/my-team', name: 'my-team', component: { template: 'Team' } },
  ],
})

describe('NavBar', () => {
  it('renders logo and core navigation links', async () => {
    const screen = render(NavBar, {
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    await expect.element(screen.getByText('Poke')).toBeVisible()
    await expect.element(screen.getByRole('link', { name: /favorites/i })).toBeVisible()
    await expect.element(screen.getByRole('link', { name: /my team/i })).toBeVisible()
  })

  it('displays the correct badge count for favorites', async () => {
    const screen = render(NavBar, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: {
                favorites: [
                  { id: 1, name: 'bulbasaur' },
                  { id: 4, name: 'charmander' },
                ],
              },
            },
          }),
        ],
      },
    })

    const badge = screen.getByText('2')
    await expect.element(badge).toBeVisible()
    await expect.element(badge).toHaveClass('bg-accent')
  })

  it('hides badges when counts are zero', async () => {
    const screen = render(NavBar, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: { favorites: [], team: [] },
            },
          }),
        ],
      },
    })

    const badge = screen.getByText(/^\d+$/)
    await expect.element(badge).not.toBeInTheDocument()
  })
})
