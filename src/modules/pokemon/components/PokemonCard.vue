<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Heart, Plus, Trash2 } from 'lucide-vue-next'
import { usePokemonStore } from '../stores/pokemonStore'
import { pokemonService } from '../services/api'
import type { Pokemon } from '../services/schema'

const props = defineProps<{
  id: number
  name?: string
}>()

const store = usePokemonStore()
const pokemon = ref<Pokemon | null>(null)
const loading = ref(false)

// State helpers from store
const isFavorite = computed(() => store.favorites.includes(props.id))
const isOnTeam = computed(() => store.team.includes(props.id))

// UI fallback: use prop name first, then fetched name
const displayName = computed(() => props.name || pokemon.value?.name || '...')

// High-Res Artwork
const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`

/**
 * Map of Pokemon types to their corresponding emojis.
 */
const typeEmojiMap: Record<string, string> = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '🥊',
  poison: '🧪',
  ground: '🏜️',
  flying: '💨',
  psychic: '🔮',
  bug: '🪲',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐲',
  dark: '🌙',
  steel: '⚙️',
  fairy: '✨',
}

async function fetchDetails() {
  try {
    loading.value = true
    pokemon.value = await pokemonService.getById(props.id.toString())
  } catch (error) {
    console.error(`Failed to fetch card details for ID ${props.id}`, error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDetails)
</script>

<template>
  <div
    class="group relative flex flex-col items-center p-6 bg-bg border rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    :style="{
      borderColor: pokemon?.types?.[0]
        ? `var(--color-type-${pokemon.types[0].type.name})40`
        : 'var(--border)',
    }"
  >
    <!-- Left Side: Type Badges (70% opacity default, 100% on hover) -->
    <div
      class="absolute top-4 left-4 flex flex-col gap-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
    >
      <template v-if="pokemon?.types">
        <span
          v-for="t in pokemon.types"
          :key="t.type.name"
          :title="t.type.name"
          class="flex items-center justify-center w-10 h-10 rounded-xl text-lg shadow-sm border border-white/10 transition-transform hover:scale-110 active:scale-95"
          :style="{ backgroundColor: `var(--color-type-${t.type.name})` }"
        >
          {{ typeEmojiMap[t.type.name] || '❓' }}
        </span>
      </template>

      <!-- Skeleton for types -->
      <template v-else>
        <div v-for="i in 2" :key="i" class="w-10 h-10 bg-text/5 animate-pulse rounded-xl" />
      </template>
    </div>

    <!-- Right Side: Action Buttons (70% opacity default, 100% on hover) -->
    <div
      class="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
    >
      <button
        @click.stop.prevent="store.toggleFavorite(id)"
        class="cursor-pointer w-10 h-10 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        :class="isFavorite ? 'card-action-btn-active' : 'card-action-btn'"
      >
        <Heart class="w-5 h-5" :class="{ 'fill-current': isFavorite }" />
      </button>

      <button
        @click.stop.prevent="isOnTeam ? store.removeFromTeam(id) : store.addToTeam(id)"
        class="cursor-pointer w-10 h-10 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center card-action-btn"
        :class="{
          'card-action-btn-active !text-primary !border-primary/30 !bg-primary/10': isOnTeam,
        }"
      >
        <component :is="isOnTeam ? Trash2 : Plus" class="w-5 h-5" />
      </button>
    </div>

    <!-- Image Container -->
    <div class="relative w-full aspect-square flex items-center justify-center mb-2 select-none">
      <div
        v-if="pokemon?.types?.[0]"
        class="absolute inset-0 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        :style="{ backgroundColor: `var(--color-type-${pokemon.types[0].type.name})` }"
      ></div>

      <img
        :src="imageUrl"
        :alt="displayName"
        class="relative w-4/5 h-4/5 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
        @error="
          (e) =>
            ((e.target as HTMLImageElement).src =
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png')
        "
      />
    </div>

    <!-- Text Info -->
    <div class="text-center w-full">
      <span class="text-[10px] font-black tracking-widest text-text/30 uppercase">
        #{{ String(id).padStart(3, '0') }}
      </span>

      <h3
        class="text-xl font-black capitalize text-text-h mt-0.5 tracking-tight group-hover:text-accent transition-colors"
      >
        {{ displayName }}
      </h3>
    </div>
  </div>
</template>
