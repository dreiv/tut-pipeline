import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const usePokemonStore = defineStore('pokemon', () => {
  const favorites = useStorage<number[]>('pokedex-favorites', [])
  const team = useStorage<number[]>('pokedex-team', [])

  const toggleFavorite = (id: number) => {
    const index = favorites.value.indexOf(id)
    if (index > -1) favorites.value.splice(index, 1)
    else favorites.value.push(id)
  }

  const addToTeam = (id: number) => {
    if (team.value.length < 6 && !team.value.includes(id)) {
      team.value.push(id)
    }
  }

  const removeFromTeam = (id: number) => {
    const index = team.value.indexOf(id)
    if (index > -1) team.value.splice(index, 1)
  }

  return { favorites, team, toggleFavorite, addToTeam, removeFromTeam }
})
