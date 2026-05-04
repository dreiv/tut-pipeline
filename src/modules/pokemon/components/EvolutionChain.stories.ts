import type { Meta, StoryObj } from '@storybook/vue3'
import EvolutionChain from './EvolutionChain.vue'

const meta: Meta<typeof EvolutionChain> = {
  title: 'Components/Pokemon/EvolutionChain',
  component: EvolutionChain,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EvolutionChain>

export const ThreeStage: Story = {
  args: {
    evolution: {
      id: 1,
      chain: {
        is_baby: false,
        species: { name: 'bulbasaur', url: '.../species/1/' },
        evolves_to: [
          {
            is_baby: false,
            species: { name: 'ivysaur', url: '.../species/2/' },
            evolves_to: [
              {
                is_baby: false,
                species: { name: 'venusaur', url: '.../species/3/' },
                evolves_to: [],
              },
            ],
          },
        ],
      },
    },
  },
}
