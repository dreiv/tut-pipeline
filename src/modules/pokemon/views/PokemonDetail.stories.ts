import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse, delay } from 'msw'
import PokemonDetail from './PokemonDetail.vue'

const meta: Meta<typeof PokemonDetail> = {
  title: 'Modules/Pokemon/PokemonDetail',
  component: PokemonDetail,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div class="p-6 bg-bg min-h-screen"><story /></div>' })],
  // MSW handlers remain same as they don't conflict with Pinia browser state
  parameters: {
    msw: {
      handlers: [
        http.get('*/pokemon/1', () =>
          HttpResponse.json({
            id: 1,
            name: 'bulbasaur',
            height: 7,
            weight: 69,
            types: [],
            stats: [],
            sprites: { other: { 'official-artwork': { front_default: '' } } },
          }),
        ),
        http.get('*/pokemon-species/1', () =>
          HttpResponse.json({
            evolution_chain: { url: '*/evolution-chain/1/' },
            flavor_text_entries: [],
          }),
        ),
        http.get('*/evolution-chain/1', () =>
          HttpResponse.json({
            chain: { is_baby: false, species: { name: 'bulbasaur' }, evolves_to: [] },
          }),
        ),
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof PokemonDetail>

export const Success: Story = { args: { id: '1' } }
