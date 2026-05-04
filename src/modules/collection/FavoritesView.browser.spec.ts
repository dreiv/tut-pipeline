import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { Routes } from '@/router'
import FavoritesView from './FavoritesView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: Routes.HOME, component: { template: 'Home' } },

    { path: '/pokemon/:id', name: Routes.POKEMON_DETAIL, component: { template: 'Detail' } },
  ],
})

describe('FavoritesView', () => {
  it('renders the grid when favorites are present', async () => {
    const screen = render(FavoritesView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: {
                favorites: [1],
                pokemonList: [{ id: 1, name: 'bulbasaur', image: 'img', url: 'url' }],
              },
            },
          }),
        ],
      },
    })

    await expect.element(screen.getByText(/You have 1 saved/i)).toBeVisible()
    await expect.element(screen.getByText('bulbasaur')).toBeVisible()
  })
})
