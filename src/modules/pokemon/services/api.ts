import { parse } from 'valibot'
import { http } from '@/core/services/http'
import {
  PokemonSchema,
  PokemonSpeciesSchema,
  EvolutionChainSchema,
  PokemonTypeResponseSchema,
  type Pokemon,
  type PokemonSpecies,
  type EvolutionChain,
  type PokemonTypeResponse,
} from './schema'

/**
 * Utility to extract the ID from a PokeAPI URL
 * (e.g., "https://pokeapi.co/api/v2/pokemon/25/" -> 25)
 * Since many list-based endpoints don't return the ID directly,
 * this helper allows us to identify resources without secondary API calls.
 */
const extractIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean)
  return Number(parts.pop())
}

export const pokemonService = {
  /**
   * Fetches a paginated list of Pokemon.
   * Includes the ID in the result to avoid extra detail calls for list views.
   * This is essential for the infinite scroll efficiency in the main Pokedex.
   */
  async list(offset = 0, limit = 20) {
    const data = await http.get<{
      count: number
      results: { name: string; url: string }[]
    }>('/pokemon', { offset, limit })

    return {
      count: data.count,
      results: data.results.map((p) => ({
        ...p,
        id: extractIdFromUrl(p.url),
      })),
    }
  },

  /**
   * Fetches Pokemon grouped by a specific type (e.g., 'fire', 'water').
   * Note: This PokeAPI endpoint is not paginated, so we return the full
   * typed collection for the store to handle.
   */
  async getByType(typeName: string): Promise<PokemonTypeResponse> {
    const data = await http.get(`/type/${typeName}`)
    return parse(PokemonTypeResponseSchema, data)
  },

  /**
   * Fetches all Pokemon names and URLs.
   * Useful for internal maps or specific data-fetching strategies
   * that require knowing the full list of available names.
   */
  async getAllNames() {
    return http.get<{ results: { name: string; url: string }[] }>('/pokemon', { limit: 2000 })
  },

  /**
   * Fetches base stats, types, and official-artwork sprites.
   */
  async getById(id: number | string): Promise<Pokemon> {
    const data = await http.get(`/pokemon/${id}`)
    return parse(PokemonSchema, data)
  },

  /**
   * Fetches species data, including flavor text and evolution chain links.
   */
  async getSpecies(id: number | string): Promise<PokemonSpecies> {
    const data = await http.get(`/pokemon-species/${id}`)
    return parse(PokemonSpeciesSchema, data)
  },

  /**
   * Fetches the recursive evolution chain.
   */
  async getEvolutionChain(chainId: number | string): Promise<EvolutionChain> {
    const data = await http.get(`/evolution-chain/${chainId}`)
    return parse(EvolutionChainSchema, data)
  },
}
