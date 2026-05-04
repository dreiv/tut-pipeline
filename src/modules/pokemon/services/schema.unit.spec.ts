import { describe, it, expect } from 'vitest'
import { parse } from 'valibot'
import { PokemonSchema } from './schema'

describe('PokemonSchema', () => {
  it('should accept a valid pokemon object with all required nested fields', () => {
    const validData = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      stats: [{ base_stat: 45, stat: { name: 'hp' } }],
      sprites: {
        front_default: 'https://...',
        other: {
          'official-artwork': {
            front_default: 'https://...',
          },
        },
      },
      types: [{ type: { name: 'grass' } }],
    }

    expect(() => parse(PokemonSchema, validData)).not.toThrow()
  })

  it('should fail if stats or other sprites are missing', () => {
    const invalidData = {
      id: 1,
      name: 'incomplete',
      height: 10,
      weight: 10,
      sprites: { front_default: 'url' },
      types: [],
    }

    expect(() => parse(PokemonSchema, invalidData)).toThrow(/Invalid key/)
  })

  it('should handle null front_default sprites correctly', () => {
    const dataWithNullSprite = {
      id: 1,
      name: 'missing-pic',
      height: 1,
      weight: 1,
      stats: [],
      sprites: {
        front_default: null,
        other: {
          'official-artwork': {
            front_default: null,
          },
        },
      },
      types: [],
    }

    expect(() => parse(PokemonSchema, dataWithNullSprite)).not.toThrow()
  })
})
