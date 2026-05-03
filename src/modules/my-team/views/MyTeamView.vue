<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import PokemonGrid from '@/modules/pokemon/components/PokemonGrid.vue'

const store = usePokemonStore()

const teamPokemon = computed(() =>
  store.team.map((id) => ({
    id,
    name: `Team Member`,
  })),
)
</script>

<template>
  <div class="space-y-8">
    <header class="flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-black tracking-tighter text-text-h">Battle Squad</h1>
        <p class="text-text/60 mt-2 font-medium">Your active roster ({{ store.team.length }}/6).</p>
      </div>
    </header>

    <div v-if="teamPokemon.length === 0" class="glass-button p-20 text-center flex-col">
      <p class="text-text/40 font-bold uppercase tracking-widest">Your team is empty</p>
    </div>

    <PokemonGrid v-else :pokemon="teamPokemon" />
  </div>
</template>
