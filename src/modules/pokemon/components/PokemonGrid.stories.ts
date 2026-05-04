import type { Meta, StoryObj } from '@storybook/vue3'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import PokemonGrid from './PokemonGrid.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/pokemon/:id', name: 'pokemon-detail', component: { template: 'div' } }],
})

const meta: Meta<typeof PokemonGrid> = {
  title: 'Components/Pokemon/PokemonGrid',
  component: PokemonGrid,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [router, createTestingPinia()],
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof PokemonGrid>

const mockPokemon = [
  {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    url: '',
  },
  {
    id: 4,
    name: 'charmander',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    url: '',
  },
  {
    id: 7,
    name: 'squirtle',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    url: '',
  },
]

export const Default: Story = {
  args: {
    pokemon: mockPokemon,
  },
}

export const Empty: Story = {
  args: {
    pokemon: [],
  },
}
