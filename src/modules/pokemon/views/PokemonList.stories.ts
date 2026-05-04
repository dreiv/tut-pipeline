import type { Meta, StoryObj } from '@storybook/vue3'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
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
    () => {
      const store = usePokemonStore()
      store.activeType = null
      store.totalCount = 151
      store.pokemonList = [
        {
          id: 1,
          name: 'bulbasaur',
          image:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ]
      return { template: '<story />' }
    },
  ],
}

export const FilteredByType: Story = {
  decorators: [
    () => {
      const store = usePokemonStore()
      store.activeType = 'fire'
      store.totalCount = 2
      store.pokemonList = [
        { id: 4, name: 'charmander', image: '...', url: '' },
        { id: 5, name: 'charmeleon', image: '...', url: '' },
      ]
      return { template: '<story />' }
    },
  ],
}

export const EmptySearch: Story = {
  decorators: [
    () => {
      const store = usePokemonStore()
      store.activeType = 'dragon'
      store.totalCount = 0
      store.pokemonList = []
      return { template: '<story />' }
    },
  ],
}
