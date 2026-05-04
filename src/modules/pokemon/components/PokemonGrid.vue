<script setup lang="ts">
import { Routes } from '@/router'
import type { PokemonListItem } from '../services/schema'
import PokemonCard from './PokemonCard.vue'

defineProps<{
  pokemon: PokemonListItem[]
}>()
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
    <RouterLink
      v-for="p in pokemon"
      :key="p.id"
      :to="{ name: Routes.POKEMON_DETAIL, params: { id: p.id } }"
      class="group/link outline-none focus-visible:ring-4 focus-visible:ring-accent/20 rounded-[2rem] transition-all"
    >
      <PokemonCard :id="p.id" :name="p.name" :image="p.image" />
    </RouterLink>
  </div>
</template>

<style scoped>
a {
  display: block;
  text-decoration: none;
  color: inherit;
}
</style>
