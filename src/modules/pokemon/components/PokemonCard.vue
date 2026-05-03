<script setup lang="ts">
import { Heart, Plus, Trash2 } from 'lucide-vue-next'
import { usePokemonStore } from '../stores/pokemonStore'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  id: number
}>()

const store = usePokemonStore()
const isFavorite = computed(() => store.favorites.includes(props.id))
const isOnTeam = computed(() => store.team.includes(props.id))

// Official High-Res Artwork
const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`
</script>

<template>
  <div
    class="group relative flex flex-col items-center p-6 bg-bg border border-border rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/50"
  >
    <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
      <button
        @click.stop.prevent="store.toggleFavorite(id)"
        class="p-2.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md saturate-150 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        :class="[
          isFavorite
            ? 'opacity-100 text-accent border-accent/40 bg-accent/10'
            : 'opacity-0 group-hover:opacity-100 text-text/40 hover:text-text hover:bg-white/20',
        ]"
      >
        <Heart class="w-5 h-5" :class="{ 'fill-current': isFavorite }" />
      </button>

      <button
        @click.stop.prevent="isOnTeam ? store.removeFromTeam(id) : store.addToTeam(id)"
        class="p-2.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md saturate-150 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        :class="[
          isOnTeam
            ? 'text-primary border-primary/40 bg-primary/10'
            : 'text-text/40 hover:text-text hover:bg-white/20',
        ]"
      >
        <component :is="isOnTeam ? Trash2 : Plus" class="w-5 h-5" />
      </button>
    </div>

    <div class="relative w-full aspect-square flex items-center justify-center mb-2 select-none">
      <div
        class="absolute inset-0 bg-accent/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>

      <img
        :src="imageUrl"
        :alt="name"
        class="relative w-4/5 h-4/5 object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
      />
    </div>

    <div class="text-center">
      <span class="text-[10px] font-black tracking-widest text-text/30 uppercase"
        >#{{ String(id).padStart(3, '0') }}</span
      >
      <h3
        class="text-xl font-black capitalize text-text-h mt-0.5 tracking-tight group-hover:text-accent transition-colors"
      >
        {{ name }}
      </h3>
    </div>
  </div>
</template>
