import { describe, it, expect } from 'vitest'
import { safeParse } from 'valibot'
import {
  PokemonSchema,
  PokemonSpeciesSchema,
  EvolutionChainSchema,
  PokemonTypeResponseSchema,
} from './schema'

/**
 * POKEAPI CONTRACT TESTS
 * These tests hit the real production API.
 * They serve as an early warning system for "Contract Drift."
 * If these fail, the API has changed and our app/mocks are out of date.
 */
describe('PokeAPI Contract Verification', () => {
  const BASE_URL = 'https://pokeapi.co/api/v2'

  it('verifies the Pokemon Detail contract (Bulbasaur)', async () => {
    const response = await fetch(`${BASE_URL}/pokemon/1`)
    const data = await response.json()

    const result = safeParse(PokemonSchema, data)

    if (!result.success) {
      // We log the issues so we know exactly what field drifted
      console.error('PokemonSchema Drift:', result.issues)
    }

    expect(result.success).toBe(true)
  })

  it('verifies the Pokemon Species contract', async () => {
    const response = await fetch(`${BASE_URL}/pokemon-species/1`)
    const data = await response.json()

    const result = safeParse(PokemonSpeciesSchema, data)

    if (!result.success) {
      console.error('PokemonSpeciesSchema Drift:', result.issues)
    }

    expect(result.success).toBe(true)
  })

  it('verifies the Evolution Chain contract', async () => {
    const response = await fetch(`${BASE_URL}/evolution-chain/1`)
    const data = await response.json()

    const result = safeParse(EvolutionChainSchema, data)

    if (!result.success) {
      console.error('EvolutionChainSchema Drift:', result.issues)
    }

    expect(result.success).toBe(true)
  })

  it('verifies the Type Response contract', async () => {
    const response = await fetch(`${BASE_URL}/type/grass`)
    const data = await response.json()

    const result = safeParse(PokemonTypeResponseSchema, data)

    if (!result.success) {
      console.error('PokemonTypeResponseSchema Drift:', result.issues)
    }

    expect(result.success).toBe(true)
  })
})
