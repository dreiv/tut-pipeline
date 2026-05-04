<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { Heart, Plus, Trash2, ArrowLeft, Loader2 } from 'lucide-vue-next'
import { pokemonService } from '@/modules/pokemon/services/api'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import type {
  Pokemon,
  PokemonSpecies,
  EvolutionChain as EvoType,
} from '@/modules/pokemon/services/schema'
import TypeBadge from '../components/TypeBadge.vue'
import EvolutionChain from '../components/EvolutionChain.vue'

const props = defineProps<{ id: string }>()
const store = usePokemonStore()

const pokemon = ref<Pokemon | null>(null)
const species = ref<PokemonSpecies | null>(null)
const evolution = ref<EvoType | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function loadAllData() {
  try {
    loading.value = true
    error.value = null

    const [pData, sData] = await Promise.all([
      pokemonService.getById(props.id),
      pokemonService.getSpecies(props.id),
    ])

    pokemon.value = pData
    species.value = sData

    const chainId = sData.evolution_chain.url.split('/').filter(Boolean).pop()
    if (chainId) {
      evolution.value = await pokemonService.getEvolutionChain(chainId)
    }
  } catch {
    error.value = "We couldn't track down this Pokémon's data."
  } finally {
    loading.value = false
  }
}

onMounted(loadAllData)
watch(() => props.id, loadAllData)

const isFavorite = computed(() => store.favorites.includes(Number(props.id)))
const isOnTeam = computed(() => store.team.includes(Number(props.id)))

const description = computed(() =>
  species.value?.flavor_text_entries
    .find((f) => f.language.name === 'en')
    ?.flavor_text.replace(/[\f\n\r]/g, ' '),
)

const getStatColor = (val: number) => {
  if (val < 50) return 'bg-red-500'
  if (val < 90) return 'bg-yellow-500'
  return 'bg-accent'
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-10 pb-20 animate-fade">
    <button
      @click="$router.back()"
      class="glass-button px-6 py-3 text-xs font-black uppercase tracking-widest gap-3 group"
    >
      <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      Back to Pokedex
    </button>

    <div v-if="loading" class="flex flex-col items-center justify-center py-20 gap-4">
      <Loader2 class="w-10 h-10 animate-spin text-accent" />
      <p class="text-text/40 font-bold uppercase tracking-[0.3em] text-xs">Accessing Data...</p>
    </div>

    <div
      v-else-if="error"
      class="glass-button !border-red-500/20 !bg-red-500/5 p-12 text-center flex-col gap-4"
    >
      <p class="text-red-500 font-bold">{{ error }}</p>
      <button @click="loadAllData" class="text-xs underline opacity-60 hover:opacity-100">
        Try Again
      </button>
    </div>

    <div v-else-if="pokemon && species" class="space-y-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          <div
            class="relative aspect-square glass-button !p-12 flex items-center justify-center overflow-hidden rounded-[3rem]"
          >
            <div
              class="absolute inset-0 blur-[100px] opacity-20 transition-colors duration-700"
              :style="{ backgroundColor: `var(--color-type-${pokemon.types[0].type.name})` }"
            />
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default ?? ''"
              :alt="pokemon.name"
              class="relative w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-110"
            />
          </div>

          <div class="flex gap-4">
            <button
              @click="store.toggleFavorite(pokemon.id)"
              class="glass-button flex-1 py-5 font-black uppercase tracking-widest text-xs gap-3"
              :class="{ '!border-accent/40 !bg-accent/10 !text-accent': isFavorite }"
            >
              <Heart class="w-5 h-5" :class="{ 'fill-current': isFavorite }" />
              {{ isFavorite ? 'Favorited' : 'Add Favorite' }}
            </button>
            <button
              @click="isOnTeam ? store.removeFromTeam(pokemon.id) : store.addToTeam(pokemon.id)"
              class="glass-button p-5"
              :class="{ '!text-accent !border-accent/30 !bg-accent/10': isOnTeam }"
            >
              <component :is="isOnTeam ? Trash2 : Plus" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <div class="lg:col-span-7 space-y-10">
          <header>
            <div class="flex items-center gap-4 mb-2">
              <span
                class="px-3 py-1 bg-text-h/5 border border-border rounded-full text-[10px] font-black tracking-widest text-text/40 uppercase"
              >
                #{{ String(pokemon.id).padStart(3, '0') }}
              </span>
            </div>
            <h1
              class="text-6xl md:text-7xl font-black capitalize text-text-h tracking-tighter leading-none"
            >
              {{ pokemon.name }}
            </h1>
            <div class="flex flex-wrap gap-3 mt-8">
              <TypeBadge
                v-for="t in pokemon.types"
                :key="t.type.name"
                :type-name="t.type.name"
                :show-label="true"
              />
            </div>
          </header>

          <p
            class="text-2xl md:text-3xl text-text-h/90 leading-tight font-medium italic tracking-tight border-l-4 border-accent/20 pl-6"
          >
            "{{ description }}"
          </p>

          <div class="grid grid-cols-2 gap-6">
            <div class="glass-button !items-start flex-col !p-6 rounded-3xl">
              <span class="text-[10px] uppercase font-black tracking-[0.2em] text-text/30 mb-2"
                >Height</span
              >
              <span class="text-2xl font-black text-text-h"
                >{{ pokemon.height / 10 }}<small class="text-sm ml-1 opacity-40">m</small></span
              >
            </div>
            <div class="glass-button !items-start flex-col !p-6 rounded-3xl">
              <span class="text-[10px] uppercase font-black tracking-[0.2em] text-text/30 mb-2"
                >Weight</span
              >
              <span class="text-2xl font-black text-text-h"
                >{{ pokemon.weight / 10 }}<small class="text-sm ml-1 opacity-40">kg</small></span
              >
            </div>
          </div>

          <section class="space-y-6 pt-4">
            <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-text/40">
              Base Statistics
            </h3>
            <div class="space-y-5">
              <div v-for="s in pokemon.stats" :key="s.stat.name" class="space-y-2">
                <div class="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span class="text-text/60">{{ s.stat.name.replace('-', ' ') }}</span>
                  <span class="text-text-h">{{ s.base_stat }}</span>
                </div>
                <div class="h-3 bg-text-h/5 rounded-full overflow-hidden border border-border/50">
                  <div
                    class="h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                    :class="getStatColor(s.base_stat)"
                    :style="{ width: `${Math.min(100, (s.base_stat / 200) * 100)}%` }"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section v-if="evolution" class="pt-20 border-t border-border">
        <EvolutionChain :evolution="evolution" />
      </section>
    </div>
  </div>
</template>
