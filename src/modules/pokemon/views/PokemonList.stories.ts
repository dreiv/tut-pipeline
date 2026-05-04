import type { Meta, StoryObj } from '@storybook/vue3'
import { createTestingPinia } from '@pinia/testing'
import PokemonList from './PokemonList.vue'

const meta: Meta<typeof PokemonList> = {
  title: 'Modules/Pokemon/PokemonList',
  component: PokemonList,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PokemonList>

export const InitialLoad: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              pokemon: {
                pokemonList: [
                  {
                    id: 1,
                    name: 'bulbasaur',
                    image:
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
                  },
                  {
                    id: 4,
                    name: 'charmander',
                    image:
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
                  },
                ],
                totalCount: 151,
                activeType: null,
              },
            },
          }),
        ],
      },
    }),
  ],
}

export const FilteredByType: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              pokemon: {
                activeType: 'fire',
                pokemonList: [
                  { id: 4, name: 'charmander', image: '...', url: '' },
                  { id: 5, name: 'charmeleon', image: '...', url: '' },
                ],
                totalCount: 2,
              },
            },
          }),
        ],
      },
    }),
  ],
}

export const EmptySearch: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              pokemon: {
                pokemonList: [],
                totalCount: 0,
                activeType: 'dragon',
              },
            },
          }),
        ],
      },
    }),
  ],
}
