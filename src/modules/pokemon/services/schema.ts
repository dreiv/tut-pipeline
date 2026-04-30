import { object, string, number, array, nullable, any, type InferOutput } from 'valibot'

export const PokemonSchema = object({
  id: number(),
  name: string(),
  height: number(),
  weight: number(),
  sprites: object({ front_default: nullable(string()) }),
  types: array(object({ type: object({ name: string() }) })),
})

export const PokemonSpeciesSchema = object({
  id: number(),
  name: string(),
  evolution_chain: object({ url: string() }),
  flavor_text_entries: array(
    object({ flavor_text: string(), language: object({ name: string() }) }),
  ),
})

export const EvolutionChainSchema = object({
  id: number(),
  chain: object({ species: object({ name: string() }), evolves_to: array(any()) }),
})

export type Pokemon = InferOutput<typeof PokemonSchema>
export type PokemonSpecies = InferOutput<typeof PokemonSpeciesSchema>
export type EvolutionChain = InferOutput<typeof EvolutionChainSchema>
