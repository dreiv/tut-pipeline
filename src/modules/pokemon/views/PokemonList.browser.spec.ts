import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { Routes } from '@/router'
import PokemonList from './PokemonList.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: Routes.HOME, component: PokemonList },
    { path: '/pokemon/:id', name: Routes.POKEMON_DETAIL, component: { template: 'Detail' } },
  ],
})

describe('PokemonList', () => {
  it('renders the initial list state', async () => {
    const screen = render(PokemonList, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            stubActions: false,
            initialState: {
              pokemon: {
                pokemonList: [{ id: 1, name: 'bulbasaur', image: 'img', url: 'url' }],
                totalCount: 151,
                activeType: null,
              },
            },
          }),
        ],
      },
    })

    await expect.element(screen.getByText('Pokedex')).toBeVisible()
    await expect.element(screen.getByText(/Showing 1 of 151/i)).toBeVisible()
  })

  it('updates the header when filtering by type', async () => {
    const screen = render(PokemonList, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            stubActions: false,
            initialState: {
              pokemon: {
                activeType: 'fire',
                pokemonList: [],
                totalCount: 0,
              },
            },
          }),
        ],
      },
    })

    await expect.element(screen.getByText(/fire type/i)).toBeVisible()
  })
})
