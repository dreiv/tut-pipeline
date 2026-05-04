<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import PokemonGrid from '@/modules/pokemon/components/PokemonGrid.vue'
import type { PokemonListItem } from '@/modules/pokemon/services/schema'

const store = usePokemonStore()

const teamPokemon = computed<PokemonListItem[]>(() =>
  store.team.map((id) => {
    // Access the cache we added to the store
    const cached = store.pokemonCache?.[id]

    if (cached) return cached

    // Fallback construction: No extra API calls
    return {
      id,
      name: `Squad Member #${id}`,
      url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    }
  }),
)
</script>

<template>
  <div class="space-y-8 animate-fade">
    <header
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8"
    >
      <div>
        <h1 class="text-4xl font-black tracking-tighter text-text-h">Battle Squad</h1>
        <div class="flex items-center gap-3 mt-2">
          <div class="flex gap-1">
            <div
              v-for="i in 6"
              :key="i"
              class="w-2 h-2 rounded-full"
              :class="
                i <= store.team.length ? 'bg-accent shadow-[0_0_8px_var(--accent)]' : 'bg-text-h/10'
              "
            />
          </div>
          <p class="text-text/60 font-medium text-sm">{{ store.team.length }} of 6 slots filled</p>
        </div>
      </div>
    </header>

    <div
      v-if="teamPokemon.length === 0"
      class="glass-button !p-20 text-center flex-col gap-6 rounded-[3rem]"
    >
      <div class="relative">
        <div
          class="w-20 h-20 bg-text-h/5 rounded-full flex items-center justify-center text-3xl opacity-20"
        >
          ⚔️
        </div>
      </div>
      <div class="space-y-2">
        <p class="text-text/40 font-bold uppercase tracking-[0.2em] text-xs">
          No Pokémon assigned to squad
        </p>
        <p class="text-text/30 text-sm max-w-xs mx-auto">
          Add Pokémon from the Pokedex to build your ultimate six-member battle team.
        </p>
      </div>
      <RouterLink
        to="/"
        class="glass-button px-8 py-3 text-xs font-black uppercase tracking-[0.2em] hover:bg-text-h hover:text-bg transition-all"
      >
        Recruit Members
      </RouterLink>
    </div>

    <PokemonGrid v-else :pokemon="teamPokemon" />
  </div>
</template>
