import { parse } from 'valibot'
import { http } from '@/core/services/http'
import {
  PokemonSchema,
  PokemonSpeciesSchema,
  EvolutionChainSchema,
  type Pokemon,
  type PokemonSpecies,
  type EvolutionChain,
} from './schema'

export const pokemonService = {
  async getById(id: number | string): Promise<Pokemon> {
    const data = await http.get(`/pokemon/${id}`)
    return parse(PokemonSchema, data)
  },

  async list(
    offset = 0,
    limit = 20,
  ): Promise<{ count: number; results: { name: string; url: string }[] }> {
    return http.get('/pokemon', { offset, limit })
  },

  async getSpecies(id: number | string): Promise<PokemonSpecies> {
    const data = await http.get(`/pokemon-species/${id}`)
    return parse(PokemonSpeciesSchema, data)
  },

  async getEvolutionChain(chainId: number | string): Promise<EvolutionChain> {
    const data = await http.get(`/evolution-chain/${chainId}`)
    return parse(EvolutionChainSchema, data)
  },
}
