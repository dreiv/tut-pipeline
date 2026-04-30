<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { pokemonService } from '@/modules/pokemon/services/api'
import type { Pokemon } from '@/modules/pokemon/services/schema'

interface Props {
  id: string
}

const props = defineProps<Props>()
const pokemon = ref<Pokemon | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function loadPokemon() {
  try {
    loading.value = true
    error.value = null

    pokemon.value = await pokemonService.getById(props.id)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to fetch data'
  } finally {
    loading.value = false
  }
}

onMounted(loadPokemon)

watch(() => props.id, loadPokemon)
</script>

<template>
  <div id="center">
    <section v-if="loading" class="card loading">
      <div class="skeleton-img"></div>
      <p>Loading Pokemon...</p>
    </section>

    <section v-else-if="error" class="card error">
      <p>⚠️ {{ error }}</p>
    </section>

    <article v-else-if="pokemon" class="card">
      <div class="img-container">
        <img :src="pokemon.sprites.front_default ?? ''" :alt="pokemon.name" class="poke-img" />
      </div>
      <h2 class="name">{{ pokemon.name }}</h2>
      <div class="stats">
        <div class="stat">
          <span class="label">Height</span>
          <span class="value">{{ pokemon.height }}</span>
        </div>
        <div class="stat">
          <span class="label">Weight</span>
          <span class="value">{{ pokemon.weight }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
#center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
</style>
