/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Meta, StoryObj } from '@storybook/vue3'
import EvolutionChain from './EvolutionChain.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/pokemon/:id', name: 'pokemon-detail', component: { template: 'div' } }],
})

const meta: Meta<typeof EvolutionChain> = {
  title: 'Components/Pokemon/EvolutionChain',
  component: EvolutionChain,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<story />',
      global: { plugins: [router] },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof EvolutionChain>

export const ThreeStage: Story = {
  args: {
    evolution: {
      id: 1,
      chain: {
        species: { name: 'bulbasaur', url: '.../species/1/' },
        evolves_to: [
          {
            species: { name: 'ivysaur', url: '.../species/2/' },
            evolves_to: [
              {
                species: { name: 'venusaur', url: '.../species/3/' },
                evolves_to: [],
              },
            ],
          },
        ],
      },
    } as any,
  },
}
