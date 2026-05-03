<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pokemonService } from '@/modules/pokemon/services/api'
import { Routes } from '@/router'
import PokemonCard from '../components/PokemonCard.vue'

const pokemonList = ref<{ name: string; url: string }[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const getPokemonId = (url: string) => Number(url.split('/').filter(Boolean).pop())

async function fetchList() {
  try {
    loading.value = true
    const data = await pokemonService.list(0, 20)
    pokemonList.value = data.results
  } catch {
    error.value = 'Failed to load the Pokedex'
  } finally {
    loading.value = false
  }
}

onMounted(fetchList)
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-3xl font-black tracking-tighter text-text-h">National Pokedex</h1>
      <p class="text-text/60 mt-2 font-medium">Catch 'em all, or at least your favorite 20.</p>
    </header>

    <!-- Skeletons -->
    <div v-if="loading" class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="h-64 bg-bg-h border border-border rounded-3xl animate-pulse"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="p-8 text-center bg-red-500/5 border border-red-500/20 rounded-3xl text-red-500"
    >
      {{ error }}
    </div>

    <!-- Main List -->
    <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
      <RouterLink
        v-for="p in pokemonList"
        :key="p.name"
        :to="{ name: Routes.POKEMON_DETAIL, params: { id: getPokemonId(p.url) } }"
      >
        <PokemonCard :name="p.name" :id="getPokemonId(p.url)" />
      </RouterLink>
    </div>
  </div>
</template>
