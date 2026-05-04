import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse, delay } from 'msw'
import { createTestingPinia } from '@pinia/testing'
import PokemonDetail from './PokemonDetail.vue'

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  stats: [
    { base_stat: 45, stat: { name: 'hp' } },
    { base_stat: 49, stat: { name: 'attack' } },
  ],
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
}

const meta: Meta<typeof PokemonDetail> = {
  title: 'Modules/Pokemon/PokemonDetail',
  component: PokemonDetail,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="p-6 bg-bg min-h-screen"><story /></div>',
      global: { plugins: [createTestingPinia()] },
    }),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('*/pokemon/1', () => HttpResponse.json(mockPokemon)),
        http.get('*/pokemon-species/1', () =>
          HttpResponse.json({
            evolution_chain: { url: '*/evolution-chain/1/' },
            flavor_text_entries: [
              { flavor_text: 'A strange seed was planted on its back.', language: { name: 'en' } },
            ],
          }),
        ),
        http.get('*/evolution-chain/1', () =>
          HttpResponse.json({ chain: { species: { name: 'bulbasaur' }, evolves_to: [] } }),
        ),
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof PokemonDetail>

export const Success: Story = { args: { id: '1' } }

export const Loading: Story = {
  args: { id: '99' },
  parameters: {
    msw: {
      handlers: [
        http.get('*/pokemon/99', async () => {
          await delay('infinite')
          return HttpResponse.json({})
        }),
      ],
    },
  },
}

export const ErrorState: Story = {
  args: { id: '404' },
  parameters: {
    msw: {
      handlers: [http.get('*/pokemon/404', () => new HttpResponse(null, { status: 404 }))],
    },
  },
}
