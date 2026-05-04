import type { Meta, StoryObj } from '@storybook/vue3'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import NavBar from './NavBar.vue'

const meta: Meta<typeof NavBar> = {
  title: 'Components/Navigation/NavBar',
  component: NavBar,
}

export default meta
type Story = StoryObj<typeof NavBar>

export const Default: Story = {
  decorators: [
    () => {
      const store = usePokemonStore()

      store.favorites = [1, 2, 3]
      store.team = [1]

      return {
        template: '<div class="bg-bg"><story /></div>',
      }
    },
  ],
}
