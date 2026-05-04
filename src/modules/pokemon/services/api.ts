import { parse } from 'valibot'
import { http } from '@/core/services/http'
import {
  PokemonSchema,
  PokemonSpeciesSchema,
  EvolutionChainSchema,
  PokemonTypeResponseSchema,
  PokemonListItemSchema,
  type Pokemon,
  type PokemonSpecies,
  type EvolutionChain,
  type PokemonListItem,
} from './schema'

/**
 * Extracts the ID from a PokeAPI URL.
 * Essential for constructing image URLs without extra API hits.
 */
const extractIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean)
  return Number(parts.pop())
}

export const pokemonService = {
  /**
   * 1. The "True" One-Call List
   * Fetches only the basic directory. Maps data to include IDs and Images
   * locally so the UI can render a full card immediately.
   */
  async list(offset = 0, limit = 20): Promise<{ count: number; results: PokemonListItem[] }> {
    const data = await http.get<{
      count: number
      results: { name: string; url: string }[]
    }>('/pokemon', { offset, limit })

    const results = data.results.map((p) => {
      const id = extractIdFromUrl(p.url)
      return parse(PokemonListItemSchema, {
        ...p,
        id,
        // High-res source constructed manually - zero network cost
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      })
    })

    return {
      count: data.count,
      results,
    }
  },

  /**
   * 2. The Type Filter (One-Call)
   * Retrieves the full list of Pokemon for a type and maps them
   * to our ListItem shape with manual image URLs.
   */
  async getByType(typeName: string): Promise<PokemonListItem[]> {
    const data = await http.get(`/type/${typeName}`)
    const parsed = parse(PokemonTypeResponseSchema, data)

    return parsed.pokemon.map((item) => {
      const id = extractIdFromUrl(item.pokemon.url)
      return {
        id,
        name: item.pokemon.name,
        url: item.pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      }
    })
  },

  /**
   * 3. Detail Fetcher
   * ONLY called when the user navigates to the detail page.
   */
  async getById(id: number | string): Promise<Pokemon> {
    const data = await http.get(`/pokemon/${id}`)
    return parse(PokemonSchema, data)
  },

  async getSpecies(id: number | string): Promise<PokemonSpecies> {
    const data = await http.get(`/pokemon-species/${id}`)
    return parse(PokemonSpeciesSchema, data)
  },

  async getEvolutionChain(chainId: number | string): Promise<EvolutionChain> {
    const data = await http.get(`/evolution-chain/${chainId}`)
    return parse(EvolutionChainSchema, data)
  },

  async getAllNames() {
    return http.get<{ results: { name: string; url: string }[] }>('/pokemon', {
      limit: 2000,
    })
  },
}
