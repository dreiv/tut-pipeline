import type { Meta, StoryObj } from '@storybook/vue3'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import PokemonCard from './PokemonCard.vue'

const meta: Meta<typeof PokemonCard> = {
  title: 'Components/Pokemon/PokemonCard',
  component: PokemonCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PokemonCard>

export const Default: Story = {
  args: {
    id: 1,
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  decorators: [() => ({ template: '<div class="max-w-[250px]"><story /></div>' })],
}

export const Favorite: Story = {
  args: { ...Default.args },
  decorators: [
    () => {
      const store = usePokemonStore()
      store.favorites = [1]
      return { template: '<div class="max-w-[250px]"><story /></div>' }
    },
  ],
}
