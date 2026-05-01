import type { Meta, StoryObj } from '@storybook/vue3'
import { http, HttpResponse, delay } from 'msw'
import PokemonDetail from './PokemonDetail.vue'

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  types: [
    { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
    { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
  ],
}

const meta: Meta<typeof PokemonDetail> = {
  title: 'Modules/Pokemon/PokemonDetail',
  component: PokemonDetail,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
  },
  parameters: {
    msw: {
      handlers: [
        http.get('*/pokemon/1', () => {
          return HttpResponse.json(mockPokemon)
        }),
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof PokemonDetail>

/**
 * Standard success view.
 */
export const Success: Story = {
  args: {
    id: '1',
  },
}

/**
 * Tests the skeleton/loading state by forcing a delay.
 */
export const Loading: Story = {
  args: {
    id: '99',
  },
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

/**
 * Tests how the component handles a 404 response.
 */
export const NotFound: Story = {
  args: {
    id: 'unknown',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('*/pokemon/unknown', () => {
          return new HttpResponse(null, {
            status: 404,
            statusText: 'Pokemon Not Found',
          })
        }),
      ],
    },
  },
}

/**
 * Verifies that the UI handles Valibot validation errors gracefully.
 */
export const SchemaError: Story = {
  args: {
    id: 'err-400',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('*/pokemon/err-400', () => {
          return HttpResponse.json({
            id: 'wrong-type', // Should be a number
            invalid_payload: true,
          })
        }),
      ],
    },
  },
}
