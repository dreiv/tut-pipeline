<script setup lang="ts">
import { computed } from 'vue'
import { Heart, Plus, Trash2 } from 'lucide-vue-next'
import { usePokemonStore } from '../stores/pokemonStore'

const props = defineProps<{
  id: number
  name: string
  image: string
}>()

const store = usePokemonStore()

const isFavorite = computed(() => store.favorites.includes(props.id))
const isOnTeam = computed(() => store.team.includes(props.id))
</script>

<template>
  <div
    class="group relative flex flex-col items-center p-6 bg-bg border border-border rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
  >
    <div class="absolute top-4 right-4 flex flex-col gap-2 z-20">
      <button
        @click.stop.prevent="store.toggleFavorite(id)"
        class="glass-button w-10 h-10 !p-0 shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
        :class="[
          isFavorite
            ? 'opacity-100 text-accent border-accent/40 bg-accent/10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]'
            : 'opacity-0 group-hover:opacity-100',
        ]"
      >
        <Heart class="w-5 h-5" :class="{ 'fill-current': isFavorite }" />
      </button>

      <button
        @click.stop.prevent="isOnTeam ? store.removeFromTeam(id) : store.addToTeam(id)"
        class="glass-button w-10 h-10 !p-0 shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
        :class="[
          isOnTeam
            ? 'opacity-100 text-text-h border-text-h/20 bg-text-h/5'
            : 'opacity-0 group-hover:opacity-100',
        ]"
      >
        <component :is="isOnTeam ? Trash2 : Plus" class="w-5 h-5" />
      </button>
    </div>

    <div class="relative w-full aspect-square flex items-center justify-center mb-2 select-none">
      <div
        class="absolute inset-0 blur-3xl rounded-full opacity-0 group-hover:opacity-10 bg-accent transition-opacity duration-700"
      />

      <img
        :src="image"
        :alt="name"
        class="relative w-4/5 h-4/5 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
      />
    </div>

    <div class="text-center w-full">
      <span class="text-[10px] font-black tracking-[0.2em] text-text/30 uppercase">
        #{{ String(id).padStart(3, '0') }}
      </span>
      <h3
        class="text-xl font-black capitalize text-text-h mt-0.5 tracking-tight group-hover:text-accent transition-colors"
      >
        {{ name }}
      </h3>
    </div>
  </div>
</template>
