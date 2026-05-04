import type { Meta, StoryObj } from '@storybook/vue3'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import FavoritesView from './FavoritesView.vue'

const meta: Meta<typeof FavoritesView> = {
  title: 'Views/FavoritesView',
  component: FavoritesView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FavoritesView>

export const Empty: Story = {
  decorators: [
    () => {
      const store = usePokemonStore()
      store.favorites = []
      return { template: '<story />' }
    },
  ],
}

export const WithFavorites: Story = {
  decorators: [
    () => {
      const store = usePokemonStore()
      store.favorites = [1, 4, 7]
      store.pokemonList = [
        { id: 1, name: 'bulbasaur', image: '...', url: '' },
        { id: 4, name: 'charmander', image: '...', url: '' },
        { id: 7, name: 'squirtle', image: '...', url: '' },
      ]
      return { template: '<story />' }
    },
  ],
}
