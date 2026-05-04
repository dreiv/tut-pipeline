import type { Meta, StoryObj } from '@storybook/vue3'
import { createTestingPinia } from '@pinia/testing'
import PokemonCard from './PokemonCard.vue'

const meta: Meta<typeof PokemonCard> = {
  title: 'Components/Pokemon/PokemonCard',
  component: PokemonCard,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="max-w-[250px]"><story /></div>',
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    }),
  ],
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
}

export const Favorite: Story = {
  args: { ...Default.args },
  decorators: [
    () => ({
      template: '<div class="max-w-[250px]"><story /></div>',
      global: {
        plugins: [
          createTestingPinia({
            initialState: { pokemon: { favorites: [1] } },
            stubActions: false,
          }),
        ],
      },
    }),
  ],
}
