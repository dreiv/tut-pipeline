import type { Meta, StoryObj } from '@storybook/vue3'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import MyTeamView from './MyTeamView.vue'

const meta: Meta<typeof MyTeamView> = {
  title: 'Views/MyTeamView',
  component: MyTeamView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MyTeamView>

export const Empty: Story = {
  decorators: [
    () => {
      const store = usePokemonStore()
      store.team = []
      return { template: '<story />' }
    },
  ],
}

export const FullSquad: Story = {
  decorators: [
    () => {
      const store = usePokemonStore()
      store.team = [1, 2, 3, 4, 5, 6]
      store.pokemonList = [
        { id: 1, name: 'bulbasaur', image: '...', url: '' },
        { id: 2, name: 'ivysaur', image: '...', url: '' },
        { id: 3, name: 'venusaur', image: '...', url: '' },
        { id: 4, name: 'charmander', image: '...', url: '' },
        { id: 5, name: 'charmeleon', image: '...', url: '' },
        { id: 6, name: 'charizard', image: '...', url: '' },
      ]
      return { template: '<story />' }
    },
  ],
}
