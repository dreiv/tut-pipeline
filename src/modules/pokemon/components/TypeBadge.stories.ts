import type { Meta, StoryObj } from '@storybook/vue3'
import PokemonTypeBadge from './TypeBadge.vue'

const meta: Meta<typeof PokemonTypeBadge> = {
  title: 'Components/Pokemon/PokemonTypeBadge',
  component: PokemonTypeBadge,
  tags: ['autodocs'],
  argTypes: {
    typeName: {
      control: 'select',
      options: ['fire', 'water', 'grass', 'electric', 'ghost', 'dragon'],
    },
  },
}

export default meta
type Story = StoryObj<typeof PokemonTypeBadge>

export const IconOnly: Story = {
  args: {
    typeName: 'fire',
    showLabel: false,
  },
}

export const WithLabel: Story = {
  args: {
    typeName: 'water',
    showLabel: true,
  },
}

export const GhostType: Story = {
  args: {
    typeName: 'ghost',
    showLabel: true,
  },
}
