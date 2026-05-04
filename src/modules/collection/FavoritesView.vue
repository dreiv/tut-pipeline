<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import PokemonGrid from '@/modules/pokemon/components/PokemonGrid.vue'
import type { PokemonListItem } from '@/modules/pokemon/services/schema'

const store = usePokemonStore()

const favoritePokemon = computed<PokemonListItem[]>(() =>
  store.favorites.map((id) => {
    const existing = store.pokemonList.find((p) => p.id === id)
    if (existing) return existing

    return {
      id,
      name: `Pokemon #${id}`,
      url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    }
  }),
)
</script>

<template>
  <div class="space-y-8 animate-fade">
    <header class="border-b border-border pb-8">
      <h1 class="text-4xl font-black tracking-tighter text-text-h">My Favorites</h1>
      <p class="text-text/60 mt-2 font-medium">
        You have <span class="text-accent font-bold">{{ favoritePokemon.length }}</span> saved
        Pokémon.
      </p>
    </header>

    <div
      v-if="favoritePokemon.length === 0"
      class="glass-button !p-20 text-center flex-col gap-4 rounded-[3rem]"
    >
      <div class="w-16 h-16 bg-text-h/5 rounded-full flex items-center justify-center text-2xl">
        ⭐
      </div>
      <p class="text-text/40 font-bold uppercase tracking-[0.2em] text-xs">
        Your collection is empty
      </p>
      <RouterLink
        to="/"
        class="glass-button px-6 py-2 text-sm font-black uppercase tracking-widest hover:bg-accent hover:text-white transition-all"
      >
        Browse Pokedex
      </RouterLink>
    </div>

    <PokemonGrid v-else :pokemon="favoritePokemon" />
  </div>
</template>
