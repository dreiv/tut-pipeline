import { http, HttpResponse } from 'msw'
import type { Pokemon, PokemonSpecies, EvolutionChain } from '@/modules/pokemon/services/schema'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const handlers = [
  http.get(`${BASE_URL}/pokemon`, ({ request }) => {
    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit')) || 20

    return HttpResponse.json({
      count: 1302,
      next: `${BASE_URL}/pokemon?offset=20&limit=20`,
      previous: null,
      results: Array.from({ length: limit }, (_, i) => ({
        name: `pokemon-${i + 1}`,
        url: `${BASE_URL}/pokemon/${i + 1}/`,
      })),
    })
  }),

  http.get(`${BASE_URL}/pokemon/:idOrName`, ({ params }) => {
    const { idOrName } = params

    // Simulate a 404 for a specific name to test error boundaries
    if (idOrName === 'not-a-pokemon') {
      return new HttpResponse(null, { status: 404 })
    }

    const mockPokemon: Pokemon = {
      id: isNaN(Number(idOrName)) ? 25 : Number(idOrName),
      name: String(idOrName),
      height: 4,
      weight: 60,
      sprites: {
        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`,
      },
      types: [{ type: { name: 'electric' } }],
    }

    return HttpResponse.json(mockPokemon)
  }),

  http.get(`${BASE_URL}/pokemon-species/:id`, ({ params }) => {
    const mockSpecies: PokemonSpecies = {
      id: Number(params.id),
      name: 'pikachu',
      evolution_chain: { url: `${BASE_URL}/evolution-chain/10/` },
      flavor_text_entries: [
        {
          flavor_text: 'When several of these POKéMON gather, their electricity builds.',
          language: { name: 'en' },
        },
      ],
    }
    return HttpResponse.json(mockSpecies)
  }),

  http.get(`${BASE_URL}/evolution-chain/:id`, () => {
    const mockEvolution: EvolutionChain = {
      id: 10,
      chain: {
        species: { name: 'pichu' },
        evolves_to: [
          {
            species: { name: 'pikachu' },
            evolves_to: [{ species: { name: 'raichu' }, evolves_to: [] }],
          },
        ],
      },
    }
    return HttpResponse.json(mockEvolution)
  }),
]
