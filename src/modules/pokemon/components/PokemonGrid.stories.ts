import type { Meta, StoryObj } from '@storybook/vue3'
import PokemonGrid from './PokemonGrid.vue'

const meta: Meta<typeof PokemonGrid> = {
  title: 'Components/Pokemon/PokemonGrid',
  component: PokemonGrid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PokemonGrid>

const mockPokemon = [
  { id: 1, name: 'bulbasaur', image: '...', url: '' },
  { id: 4, name: 'charmander', image: '...', url: '' },
  { id: 7, name: 'squirtle', image: '...', url: '' },
]

export const Default: Story = { args: { pokemon: mockPokemon } }
export const Empty: Story = { args: { pokemon: [] } }
