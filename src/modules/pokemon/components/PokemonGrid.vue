<script setup lang="ts">
import { Routes } from '@/router'
import PokemonCard from './PokemonCard.vue'

defineProps<{
  pokemon: { name: string; id: number }[]
}>()
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
    <RouterLink
      v-for="p in pokemon"
      :key="p.id"
      :to="{ name: Routes.POKEMON_DETAIL, params: { id: p.id } }"
    >
      <PokemonCard :name="p.name" :id="p.id" />
    </RouterLink>
  </div>
</template>
