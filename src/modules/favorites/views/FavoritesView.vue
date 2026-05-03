<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import PokemonGrid from '@/modules/pokemon/components/PokemonGrid.vue'

const store = usePokemonStore()

// We create a "virtual" list based on the IDs saved in store.favorites
const favoritePokemon = computed(() =>
  store.favorites.map((id) => ({
    id,
    name: '',
  })),
)
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-black tracking-tighter text-text-h">My Favorites</h1>
      <p class="text-text/60 mt-2 font-medium">Your curated collection of top-tier Pokémon.</p>
    </header>

    <div v-if="favoritePokemon.length === 0" class="glass-button p-20 text-center flex-col gap-4">
      <p class="text-text/40 font-bold uppercase tracking-widest">No favorites yet</p>
      <RouterLink to="/" class="text-accent font-black hover:underline">Go catch some!</RouterLink>
    </div>

    <PokemonGrid v-else :pokemon="favoritePokemon" />
  </div>
</template>
