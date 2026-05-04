import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { Routes } from '@/router'
import MyTeamView from './MyTeamView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: Routes.HOME, component: { template: 'Home' } },
    { path: '/pokemon/:id', name: Routes.POKEMON_DETAIL, component: { template: 'Detail' } },
  ],
})

describe('MyTeamView', () => {
  it('renders the squad progress and pokemon cards', async () => {
    const screen = render(MyTeamView, {
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: {
                team: [1],
                pokemonList: [{ id: 1, name: 'bulbasaur', image: 'img', url: 'url' }],
              },
            },
          }),
        ],
      },
    })

    await expect.element(screen.getByText(/1 of 6 slots filled/i)).toBeVisible()
    await expect.element(screen.getByText('bulbasaur')).toBeVisible()
  })
})
