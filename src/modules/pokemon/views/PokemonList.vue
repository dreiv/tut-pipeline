<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { usePokemonStore } from '../stores/pokemonStore'
import { ChevronDown } from 'lucide-vue-next' // Added for the dropdown icon
import PokemonGrid from '../components/PokemonGrid.vue'

const store = usePokemonStore()
const loading = ref(false)
const error = ref<string | null>(null)
const loadMoreTrigger = ref<HTMLElement | null>(null)

const typeNames = [
  'normal',
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

async function loadPokemon() {
  if (loading.value || !store.hasMore || store.activeType) return

  try {
    loading.value = true
    await store.fetchNextPage()
  } catch {
    error.value = 'Failed to load the Pokedex'
  } finally {
    loading.value = false
  }
}

async function handleTypeChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const typeName = target.value || null // Handle "All Pokemon" selection

  if (loading.value) return
  error.value = null

  try {
    loading.value = true
    await store.fetchByType(typeName)
  } catch {
    error.value = `Failed to load ${typeName} Pokemon`
  } finally {
    loading.value = false
  }
}

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting) {
    loadPokemon()
  }
})

onMounted(() => {
  if (store.pokemonList.length === 0) loadPokemon()
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header with Dropdown Filter -->
    <header
      class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8"
    >
      <div>
        <h1 class="text-4xl font-black capitalize tracking-tighter text-text-h leading-none">
          {{ store.activeType ? `${store.activeType} type` : 'National Pokedex' }}
        </h1>
        <p class="text-text/60 mt-2 font-medium">
          Showing {{ store.pokemonList.length }} of {{ store.totalCount }} Pokemon
        </p>
      </div>

      <!-- Filter Dropdown -->
      <div class="relative min-w-[200px]">
        <label
          for="type-filter"
          class="block text-[10px] font-black uppercase tracking-[0.2em] text-text/40 mb-2"
        >
          Filter by Type
        </label>
        <div class="relative">
          <select
            id="type-filter"
            :value="store.activeType || ''"
            @change="handleTypeChange"
            class="w-full appearance-none bg-bg-h border border-border rounded-xl px-4 py-3 text-sm font-bold text-text-h focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50 transition-all cursor-pointer"
          >
            <option value="">All Pokemon</option>
            <option v-for="type in typeNames" :key="type" :value="type" class="capitalize bg-bg">
              {{ type }}
            </option>
          </select>
          <ChevronDown
            class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40 pointer-events-none"
          />
        </div>
      </div>
    </header>

    <!-- Error State -->
    <div
      v-if="error"
      class="p-8 text-center bg-red-500/5 border border-red-500/20 rounded-3xl text-red-500"
    >
      {{ error }}
    </div>

    <!-- Grid -->
    <PokemonGrid :pokemon="store.pokemonList" />

    <!-- Skeletons & Infinite Scroll Sentinel -->
    <div ref="loadMoreTrigger" class="space-y-6 pt-10">
      <div v-if="loading" class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
        <div
          v-for="i in 4"
          :key="i"
          class="h-64 bg-bg-h border border-border rounded-3xl animate-pulse"
        />
      </div>

      <div class="h-20 flex items-center justify-center">
        <p
          v-if="!store.hasMore && !loading"
          class="text-text/40 font-bold tracking-widest uppercase text-xs"
        >
          {{ store.activeType ? `End of results` : 'National Pokedex Complete' }}
        </p>
      </div>
    </div>
  </div>
</template>
