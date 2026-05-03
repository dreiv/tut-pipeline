import { object, string, number, array, nullable, any, lazy, type InferOutput } from 'valibot'

/**
 * 1. Pokemon Detail Schema
 */
export const PokemonSchema = object({
  id: number(),
  name: string(),
  height: number(),
  weight: number(),
  stats: array(
    object({
      base_stat: number(),
      stat: object({ name: string() }),
    }),
  ),
  sprites: object({
    front_default: nullable(string()),
    other: object({
      'official-artwork': object({
        front_default: nullable(string()),
      }),
    }),
  }),
  types: array(
    object({
      type: object({ name: string() }),
    }),
  ),
})

/**
 * 2. Pokemon Species Schema
 */
export const PokemonSpeciesSchema = object({
  id: number(),
  name: string(),
  evolution_chain: object({ url: string() }),
  flavor_text_entries: array(
    object({
      flavor_text: string(),
      language: object({ name: string() }),
    }),
  ),
})

/**
 * 3. Evolution Chain Schema
 */
export const EvolutionDetailSchema: any = object({
  species: object({
    name: string(),
    url: string(),
  }),
  evolves_to: array(lazy(() => EvolutionDetailSchema)),
  is_baby: any(),
})

export const EvolutionChainSchema = object({
  id: number(),
  chain: EvolutionDetailSchema,
})

/**
 * 4. Pokemon Type Response Schema
 * Added to handle filtering by type.
 */
export const PokemonTypeResponseSchema = object({
  pokemon: array(
    object({
      pokemon: object({
        name: string(),
        url: string(),
      }),
    }),
  ),
})

// Type Inferences
export type Pokemon = InferOutput<typeof PokemonSchema>
export type PokemonSpecies = InferOutput<typeof PokemonSpeciesSchema>
export type EvolutionChain = InferOutput<typeof EvolutionChainSchema>
export type PokemonTypeResponse = InferOutput<typeof PokemonTypeResponseSchema>
