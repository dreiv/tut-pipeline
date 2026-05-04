import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePokemonStore } from './pokemonStore'
import { pokemonService } from '../services/api'
import type { PokemonListItem } from '../services/schema'

vi.mock('../services/api', () => ({
  pokemonService: {
    list: vi.fn<
      (offset: number, limit: number) => Promise<{ results: PokemonListItem[]; count: number }>
    >(),
    getByType: vi.fn<(typeName: string) => Promise<PokemonListItem[]>>(),
  },
}))

describe('PokemonStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('toggles favorites correctly', () => {
    const store = usePokemonStore()
    store.toggleFavorite(1)
    expect(store.favorites).toContain(1)
    store.toggleFavorite(1)
    expect(store.favorites).not.toContain(1)
  })

  it('adds to team only if squad has space (max 6)', () => {
    const store = usePokemonStore()

    for (let i = 1; i <= 6; i++) store.addToTeam(i)

    expect(store.team).toHaveLength(6)
    store.addToTeam(7)
    expect(store.team).toHaveLength(6)
    expect(store.team).not.toContain(7)
  })

  it('fetches and appends next page of results', async () => {
    const store = usePokemonStore()
    const mockData = {
      results: [{ id: 1, name: 'bulba', image: '', url: '' }],
      count: 100,
    }

    vi.mocked(pokemonService.list).mockResolvedValue(mockData)

    await store.fetchNextPage()
    expect(store.pokemonList).toHaveLength(1)
    expect(store.totalCount).toBe(100)
    expect(store.currentOffset).toBe(20)
  })
})
