import { http, HttpResponse } from 'msw'
import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain,
  PokemonTypeResponse,
} from '@/modules/pokemon/services/schema'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const handlers = [
  /**
   * 1. Paginated List Handler
   * Simulates a smaller Pokedex (64 total) to easily test the end-of-list UX.
   */
  http.get(`${BASE_URL}/pokemon`, ({ request }) => {
    const url = new URL(request.url)
    const limit = Number(url.searchParams.get('limit')) || 20
    const offset = Number(url.searchParams.get('offset')) || 0

    const TOTAL_POKEMON = 64

    const results = Array.from({ length: limit }, (_, i) => {
      const id = offset + i + 1

      if (id > TOTAL_POKEMON) return null

      return {
        name: `pokemon-${id}`,
        url: `${BASE_URL}/pokemon/${id}/`,
      }
    }).filter((p): p is { name: string; url: string } => p !== null)

    return HttpResponse.json({
      count: TOTAL_POKEMON,
      next:
        offset + limit < TOTAL_POKEMON
          ? `${BASE_URL}/pokemon?offset=${offset + limit}&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `${BASE_URL}/pokemon?offset=${Math.max(0, offset - limit)}&limit=${limit}`
          : null,
      results,
    })
  }),

  /**
   * 2. Detailed Pokemon Handler
   * Includes the high-res sprites and stats required by PokemonSchema.
   */
  http.get(`${BASE_URL}/pokemon/:idOrName`, ({ params }) => {
    const { idOrName } = params

    if (idOrName === 'not-a-pokemon') {
      return new HttpResponse(null, { status: 404 })
    }

    const id = isNaN(Number(idOrName)) ? 1 : Number(idOrName)

    const mockPokemon: Pokemon = {
      id,
      name: String(idOrName),
      height: 7,
      weight: 69,
      stats: [
        { base_stat: 45, stat: { name: 'hp' } },
        { base_stat: 49, stat: { name: 'attack' } },
      ],
      sprites: {
        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        other: {
          'official-artwork': {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          },
        },
      },
      types: [{ type: { name: 'grass' } }],
    }

    return HttpResponse.json(mockPokemon)
  }),

  /**
   * 3. Species Handler
   * Connects the Pokemon to its evolution chain.
   */
  http.get(`${BASE_URL}/pokemon-species/:id`, ({ params }) => {
    const id = Number(params.id)

    const mockSpecies: PokemonSpecies = {
      id,
      name: `pokemon-species-${id}`,
      evolution_chain: { url: `${BASE_URL}/evolution-chain/${id}/` },
      flavor_text_entries: [
        {
          flavor_text: 'A strange seed was planted on its back at birth.',
          language: { name: 'en' },
        },
      ],
    }
    return HttpResponse.json(mockSpecies)
  }),

  /**
   * 4. Recursive Evolution Chain Handler
   * Matches the EvolutionChainSchema with nested evolves_to arrays.
   */
  http.get(`${BASE_URL}/evolution-chain/:id`, ({ params }) => {
    const id = Number(params.id)

    const mockEvolution: EvolutionChain = {
      id,
      chain: {
        species: { name: 'bulbasaur', url: `${BASE_URL}/pokemon-species/1/` },
        is_baby: false,
        evolves_to: [
          {
            species: { name: 'ivysaur', url: `${BASE_URL}/pokemon-species/2/` },
            is_baby: false,
            evolves_to: [
              {
                species: { name: 'venusaur', url: `${BASE_URL}/pokemon-species/3/` },
                is_baby: false,
                evolves_to: [],
              },
            ],
          },
        ],
      },
    }
    return HttpResponse.json(mockEvolution)
  }),

  /**
   * 5. Type Filter Handler
   * Simulates the /type/:name endpoint.
   * Required for testing the new dropdown filtering functionality.
   */
  http.get(`${BASE_URL}/type/:name`, ({ params }) => {
    const { name } = params

    const mockTypeResponse: PokemonTypeResponse = {
      pokemon: [
        {
          pokemon: {
            name: `mock-${name}-1`,
            url: `${BASE_URL}/pokemon/1/`,
          },
        },
        {
          pokemon: {
            name: `mock-${name}-2`,
            url: `${BASE_URL}/pokemon/4/`,
          },
        },
        {
          pokemon: {
            name: `mock-${name}-3`,
            url: `${BASE_URL}/pokemon/7/`,
          },
        },
      ],
    }

    return HttpResponse.json(mockTypeResponse)
  }),
]
