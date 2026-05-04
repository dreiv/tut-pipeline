import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import PokemonGrid from './PokemonGrid.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/pokemon/:id', name: 'pokemon-detail', component: { template: 'Detail' } }],
})

describe('PokemonGrid', () => {
  const mockPokemon = [
    { id: 1, name: 'bulbasaur', image: 'img1', url: 'url1' },
    { id: 25, name: 'pikachu', image: 'img25', url: 'url25' },
  ]

  it('renders the correct number of pokemon cards', async () => {
    const screen = render(PokemonGrid, {
      props: { pokemon: mockPokemon },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    const links = screen.getByRole('link')

    await expect.element(links.first()).toBeVisible()

    await expect.element(screen.getByText('bulbasaur')).toBeVisible()
    await expect.element(screen.getByText('pikachu')).toBeVisible()
  })

  it('links each card to the correct detail page', async () => {
    const screen = render(PokemonGrid, {
      props: { pokemon: mockPokemon },
      global: {
        plugins: [router, createTestingPinia()],
      },
    })

    const pikachuLink = screen.getByRole('link', { name: /pikachu/i })
    await expect.element(pikachuLink).toHaveAttribute('href', '/pokemon/25')
  })
})
