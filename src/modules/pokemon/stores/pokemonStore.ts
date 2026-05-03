import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { pokemonService } from '../services/api'

// Define the structure for the type endpoint response to satisfy ESLint
interface TypeResponseItem {
  pokemon: {
    name: string
    url: string
  }
}

export const usePokemonStore = defineStore('pokemon', () => {
  // Persistence for IDs
  const favorites = useStorage<number[]>('pokedex-favorites', [])
  const team = useStorage<number[]>('pokedex-team', [])

  // List State
  const pokemonList = ref<{ name: string; id: number }[]>([])
  const totalCount = ref(0)
  const currentOffset = ref(0)
  const limit = 20

  // Filter State
  const activeType = ref<string | null>(null)

  // Computed: hasMore is false if we are filtering by type (API returns full list)
  const hasMore = computed(() => {
    if (activeType.value) return false
    return pokemonList.value.length < totalCount.value || totalCount.value === 0
  })

  /**
   * Fetches the next page of Pokemon (National Dex).
   */
  async function fetchNextPage() {
    // If we were filtering, reset state before loading the National Dex
    if (activeType.value) {
      activeType.value = null
      currentOffset.value = 0
      pokemonList.value = []
    }

    const data = await pokemonService.list(currentOffset.value, limit)

    if (currentOffset.value === 0) {
      pokemonList.value = data.results
    } else {
      pokemonList.value.push(...data.results)
    }

    totalCount.value = data.count
    currentOffset.value += limit
  }

  /**
   * Fetches all Pokemon of a specific type.
   */
  async function fetchByType(typeName: string | null) {
    if (!typeName) {
      activeType.value = null
      currentOffset.value = 0
      pokemonList.value = []
      await fetchNextPage()
      return
    }

    activeType.value = typeName

    // Fixed: Ensure pokemonService has getByType implemented
    const data = await pokemonService.getByType(typeName)

    // Fixed: Replaced 'any' with TypeResponseItem for ESLint
    pokemonList.value = data.pokemon.map((item: TypeResponseItem) => {
      const urlParts = item.pokemon.url.split('/').filter(Boolean)
      return {
        name: item.pokemon.name,
        id: Number(urlParts[urlParts.length - 1]),
      }
    })

    totalCount.value = pokemonList.value.length
  }

  const favoriteList = computed(() => favorites.value.map((id) => ({ id, name: '' })))

  const teamList = computed(() => team.value.map((id) => ({ id, name: '' })))

  function toggleFavorite(id: number) {
    const idx = favorites.value.indexOf(id)
    if (idx > -1) favorites.value.splice(idx, 1)
    else favorites.value.push(id)
  }

  function addToTeam(id: number) {
    if (team.value.length < 6 && !team.value.includes(id)) {
      team.value.push(id)
    }
  }

  function removeFromTeam(id: number) {
    team.value = team.value.filter((itemId) => itemId !== id)
  }

  return {
    pokemonList,
    favorites,
    team,
    activeType,
    favoriteList,
    teamList,
    hasMore,
    totalCount,
    currentOffset,
    fetchNextPage,
    fetchByType,
    toggleFavorite,
    addToTeam,
    removeFromTeam,
  }
})
