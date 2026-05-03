<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { Heart, Plus, Trash2, ArrowRight } from 'lucide-vue-next'
import { pokemonService } from '@/modules/pokemon/services/api'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import { Routes } from '@/router'
import type { Pokemon, PokemonSpecies, EvolutionChain } from '@/modules/pokemon/services/schema'

const props = defineProps<{ id: string }>()
const store = usePokemonStore()

const pokemon = ref<Pokemon | null>(null)
const species = ref<PokemonSpecies | null>(null)
const evolution = ref<EvolutionChain | null>(null)

const loading = ref(true)
const error = ref<string | null>(null)

async function loadAllData() {
  try {
    loading.value = true
    error.value = null

    // Parallel fetch for core details and species data
    const [pData, sData] = await Promise.all([
      pokemonService.getById(props.id),
      pokemonService.getSpecies(props.id),
    ])

    pokemon.value = pData
    species.value = sData

    // Extract Chain ID from the species URL to fetch evolution data
    const chainId = sData.evolution_chain.url.split('/').filter(Boolean).pop()
    if (chainId) {
      evolution.value = await pokemonService.getEvolutionChain(chainId)
    }
  } catch (e) {
    error.value = "We couldn't track down this Pokémon's data."
  } finally {
    loading.value = false
  }
}

onMounted(loadAllData)
watch(() => props.id, loadAllData)

const isFavorite = computed(() => store.favorites.includes(Number(props.id)))
const isOnTeam = computed(() => store.team.includes(Number(props.id)))

// Sanitizes flavor text (removes form-feed characters)
const description = computed(() =>
  species.value?.flavor_text_entries
    .find((f) => f.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' '),
)

// Flattens the recursive API response into a simple array for the UI
const flattenedChain = computed(() => {
  if (!evolution.value) return []
  const chain: { name: string; id: number }[] = []

  let current = evolution.value.chain
  while (current) {
    const id = Number(current.species.url.split('/').filter(Boolean).pop())
    chain.push({ name: current.species.name, id })
    current = current.evolves_to[0] // Follows the primary evolution path
  }
  return chain
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10 pb-20">
    <!-- Navigation -->
    <button @click="$router.back()" class="glass-button px-4 py-2 text-sm font-bold gap-2 group">
      <ArrowRight class="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
      Back to Pokedex
    </button>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-5 aspect-square bg-bg-h border border-border rounded-3xl" />
        <div class="md:col-span-7 space-y-6 pt-4">
          <div class="h-12 w-3/4 bg-bg-h rounded-xl" />
          <div class="h-24 w-full bg-bg-h rounded-xl" />
          <div class="grid grid-cols-2 gap-4">
            <div class="h-16 bg-bg-h rounded-xl" />
            <div class="h-16 bg-bg-h rounded-xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-10 text-center glass-button border-red-500/20 text-red-500">
      <p class="font-bold text-lg">{{ error }}</p>
    </div>

    <!-- Main Content -->
    <div v-else-if="pokemon && species" class="space-y-16">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        <!-- Left Column: Media & Actions -->
        <div class="md:col-span-5 space-y-6">
          <div
            class="relative aspect-square glass-button !p-12 flex items-center justify-center overflow-hidden"
          >
            <div class="absolute inset-0 bg-accent/10 blur-3xl rounded-full" />
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default ?? ''"
              :alt="pokemon.name"
              class="relative w-full h-full object-contain drop-shadow-2xl scale-110"
            />
          </div>

          <div class="flex gap-4">
            <button
              @click="store.toggleFavorite(pokemon.id)"
              class="glass-button flex-1 py-4 font-bold gap-3"
              :class="{ 'card-action-btn-active': isFavorite }"
            >
              <Heart class="w-5 h-5" :class="{ 'fill-current': isFavorite }" />
              {{ isFavorite ? 'Favorited' : 'Add Favorite' }}
            </button>

            <button
              @click="isOnTeam ? store.removeFromTeam(pokemon.id) : store.addToTeam(pokemon.id)"
              class="glass-button p-4"
              :class="{ '!text-primary !border-primary/30 !bg-primary/10': isOnTeam }"
              :title="isOnTeam ? 'Remove from Team' : 'Add to Team'"
            >
              <component :is="isOnTeam ? Trash2 : Plus" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Right Column: Information -->
        <div class="md:col-span-7 space-y-8">
          <header>
            <span class="text-sm font-black tracking-widest text-accent uppercase">
              #{{ String(pokemon.id).padStart(3, '0') }}
            </span>
            <h1
              class="text-5xl md:text-6xl font-black capitalize text-text-h tracking-tighter mt-1"
            >
              {{ pokemon.name }}
            </h1>

            <div class="flex gap-2 mt-6">
              <span
                v-for="t in pokemon.types"
                :key="t.type.name"
                class="px-4 py-1.5 rounded-xl border border-border bg-bg/50 text-xs font-black uppercase tracking-widest"
              >
                {{ t.type.name }}
              </span>
            </div>
          </header>

          <p class="text-xl md:text-2xl text-text/80 leading-relaxed font-medium italic">
            "{{ description }}"
          </p>

          <!-- Physical Traits -->
          <div class="grid grid-cols-2 gap-4">
            <div class="glass-button !items-start flex-col !p-5">
              <span class="text-[10px] uppercase font-black tracking-widest text-text/40 mb-1"
                >Height</span
              >
              <span class="text-xl font-bold">{{ pokemon.height / 10 }}m</span>
            </div>
            <div class="glass-button !items-start flex-col !p-5">
              <span class="text-[10px] uppercase font-black tracking-widest text-text/40 mb-1"
                >Weight</span
              >
              <span class="text-xl font-bold">{{ pokemon.weight / 10 }}kg</span>
            </div>
          </div>

          <!-- Base Stats -->
          <div class="space-y-5">
            <h3 class="text-sm font-black uppercase tracking-widest text-text/60">
              Base Statistics
            </h3>
            <div class="space-y-4">
              <div v-for="s in pokemon.stats" :key="s.stat.name" class="space-y-1.5">
                <div class="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                  <span class="text-text/60">{{ s.stat.name.replace('-', ' ') }}</span>
                  <span class="text-accent">{{ s.base_stat }}</span>
                </div>
                <div class="h-2 bg-border/50 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-accent transition-all duration-1000 ease-out"
                    :style="{ width: `${Math.min(100, (s.base_stat / 200) * 100)}%` }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Evolution Chain Section -->
      <section v-if="evolution && flattenedChain.length > 1" class="pt-12 border-t border-border">
        <h3
          class="text-sm font-black uppercase tracking-widest text-text/60 mb-10 text-center md:text-left"
        >
          Evolution Path
        </h3>

        <div class="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <template v-for="(step, index) in flattenedChain" :key="step.id">
            <RouterLink
              :to="{ name: Routes.POKEMON_DETAIL, params: { id: step.id } }"
              class="group flex flex-col items-center gap-4"
            >
              <div
                class="w-28 h-28 md:w-36 md:h-36 glass-button !rounded-full p-6 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all"
              >
                <img
                  :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${step.id}.png`"
                  :alt="step.name"
                  class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span
                class="text-xs font-black capitalize tracking-widest text-text/40 group-hover:text-accent transition-colors"
              >
                {{ step.name }}
              </span>
            </RouterLink>

            <!-- Connector Arrow -->
            <div v-if="index < flattenedChain.length - 1" class="text-border hidden sm:block">
              <ArrowRight class="w-6 h-6 opacity-50" />
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>
