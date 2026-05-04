import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { Routes } from '@/router'
import EvolutionChainComponent from './EvolutionChain.vue'
import type { EvolutionChain } from '@/modules/pokemon/services/schema'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/pokemon/:id', name: Routes.POKEMON_DETAIL, component: { template: 'Detail' } },
  ],
})

describe('EvolutionChain', () => {
  const mockEvolution: EvolutionChain = {
    id: 1,
    chain: {
      is_baby: false,
      species: { name: 'pichu', url: 'https://pokeapi.co/api/v2/pokemon-species/172/' },
      evolves_to: [
        {
          is_baby: false,
          species: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
          evolves_to: [
            {
              is_baby: false,
              species: { name: 'raichu', url: 'https://pokeapi.co/api/v2/pokemon-species/26/' },
              evolves_to: [],
            },
          ],
        },
      ],
    },
  }

  it('renders all stages of the evolution path', async () => {
    const screen = render(EvolutionChainComponent, {
      props: { evolution: mockEvolution },
      global: { plugins: [router] },
    })

    await expect.element(screen.getByText('pichu')).toBeVisible()
    await expect.element(screen.getByText('pikachu')).toBeVisible()
    await expect.element(screen.getByText('raichu')).toBeVisible()
  })

  it('links each stage to the correct detail page', async () => {
    const screen = render(EvolutionChainComponent, {
      props: { evolution: mockEvolution },
      global: { plugins: [router] },
    })

    const pikachuLink = screen.getByRole('link', { name: /pikachu/i })
    await expect.element(pikachuLink).toHaveAttribute('href', '/pokemon/25')
  })

  it('hides the section if there is only one stage', async () => {
    const singleStage: EvolutionChain = {
      id: 1,
      chain: {
        is_baby: false,
        species: { name: 'tauros', url: 'https://pokeapi.co/api/v2/pokemon-species/128/' },
        evolves_to: [],
      },
    }
    const screen = render(EvolutionChainComponent, {
      props: { evolution: singleStage },
      global: { plugins: [router] },
    })

    await expect.element(screen.getByText('Evolution Path')).not.toBeInTheDocument()
  })
})
