import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { Routes } from '@/router'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import PokemonDetail from './PokemonDetail.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/pokemon/:id', name: Routes.POKEMON_DETAIL, component: PokemonDetail }],
})

describe('PokemonDetail', () => {
  it('toggles favorite status when the heart button is clicked', async () => {
    const pinia = createTestingPinia({ stubActions: false })
    const store = usePokemonStore()

    const screen = render(PokemonDetail, {
      props: { id: '1' },
      global: { plugins: [router, pinia] },
    })

    const favButton = screen.getByRole('button', { name: /add favorite/i })
    await favButton.click()

    expect(store.toggleFavorite).toHaveBeenCalledWith(1)
  })
})
