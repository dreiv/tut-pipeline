import { describe, it, expect } from 'vitest'
import { parse } from 'valibot'
import { PokemonSchema } from './schema'

describe('PokemonSchema', () => {
  it('should accept a valid pokemon object', () => {
    const validData = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      sprites: { front_default: 'https://...' },
      types: [{ type: { name: 'grass' } }],
    }

    expect(() => parse(PokemonSchema, validData)).not.toThrow()
  })

  it('should fail if required fields are missing', () => {
    const invalidData = { name: 'missing-id' }

    expect(() => parse(PokemonSchema, invalidData)).toThrow(/Invalid/)
  })

  it('should handle null sprites correctly', () => {
    const dataWithNullSprite = {
      id: 1,
      name: 'missing-pic',
      height: 1,
      weight: 1,
      sprites: { front_default: null }, // v.nullable() allows this
      types: [],
    }

    expect(() => parse(PokemonSchema, dataWithNullSprite)).not.toThrow()
  })
})
