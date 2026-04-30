<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { pokemonService } from "@/modules/pokemon/services/api";
import { Routes } from "@/router";

const pokemonList = ref<{ name: string; url: string }[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const getPokemonId = (url: string) => url.split("/").filter(Boolean).pop();

async function fetchList() {
  try {
    loading.value = true;
    const data = await pokemonService.list(0, 20);
    pokemonList.value = data.results;
  } catch {
    error.value = "Failed to load the Pokedex";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchList);
</script>

<template>
  <div class="list-container">
    <header class="list-header">
      <p class="opacity-60">Select a Pokemon to view details</p>
    </header>

    <div v-if="loading" class="grid-layout">
      <div v-for="i in 8" :key="i" class="card skeleton-card"></div>
    </div>

    <div v-else-if="error" class="error-msg">{{ error }}</div>

    <div v-else class="grid-layout">
      <RouterLink
        v-for="p in pokemonList"
        :key="p.name"
        :to="{ name: Routes.POKEMON_DETAIL, params: { id: getPokemonId(p.url) } }"
        class="card pokemon-card"
      >
        <div class="img-wrapper">
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(p.url)}.png`"
            class="list-img"
          />
        </div>
        <h3 class="capitalize font-semibold">{{ p.name }}</h3>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.pokemon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.pokemon-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}

.img-wrapper {
  background: var(--bg);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  border: 1px solid var(--zinc-200);
}

.list-img {
  width: 64px;
  height: 64px;
  image-rendering: pixelated;
}

.skeleton-card {
  height: 140px;
  background: var(--zinc-200);
  opacity: 0.5;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.2;
  }
}
</style>
