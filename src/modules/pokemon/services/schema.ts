import {
  object,
  string,
  number,
  array,
  nullable,
  lazy,
  boolean,
  type InferOutput,
  type GenericSchema,
} from 'valibot'

/**
 * 1. Pokemon List Item Schema
 * The primary contract for the Pokedex grid.
 */
export const PokemonListItemSchema = object({
  id: number(),
  name: string(),
  url: string(),
  image: string(),
})

/**
 * 2. Full Pokemon Detail Schema
 * Reserved for the Detail View only.
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
 * 3. Pokemon Species Schema
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
 * 4. Evolution Chain Schema (Recursive)
 * We define the interface to solve the ESLint "no-explicit-any" error
 * caused by the circular reference in evolves_to.
 */
interface EvolutionDetail {
  species: {
    name: string
    url: string
  }
  evolves_to: EvolutionDetail[]
  is_baby: boolean
}

export const EvolutionDetailSchema: GenericSchema<EvolutionDetail> = object({
  species: object({
    name: string(),
    url: string(),
  }),
  evolves_to: array(lazy(() => EvolutionDetailSchema)),
  is_baby: boolean(),
})

export const EvolutionChainSchema = object({
  id: number(),
  chain: EvolutionDetailSchema,
})

/**
 * 5. Type Response Schema
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
export type PokemonListItem = InferOutput<typeof PokemonListItemSchema>
export type Pokemon = InferOutput<typeof PokemonSchema>
export type PokemonSpecies = InferOutput<typeof PokemonSpeciesSchema>
export type EvolutionChain = InferOutput<typeof EvolutionChainSchema>
export type PokemonTypeResponse = InferOutput<typeof PokemonTypeResponseSchema>
