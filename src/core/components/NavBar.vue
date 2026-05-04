<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Heart, Shield } from 'lucide-vue-next'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import { Routes } from '@/router'

const store = usePokemonStore()

const favoriteCount = computed(() => store.favorites.length)
const teamCount = computed(() => store.team.length)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
    <div class="container mx-auto px-6 h-16 flex items-center justify-between">
      <RouterLink
        :to="{ name: Routes.HOME }"
        class="logo group text-2xl font-black tracking-tighter !gap-0"
      >
        <span class="text-accent">Poke</span>
        <span class="text-text-h">Dexy</span>
      </RouterLink>

      <nav class="flex items-center gap-2">
        <RouterLink :to="{ name: Routes.FAVORITES }" class="nav-item group">
          <div class="relative flex">
            <Heart
              class="w-5 h-5 transition-transform group-hover:scale-110"
              :class="{ 'fill-accent text-accent': favoriteCount > 0 }"
            />
            <span
              v-if="favoriteCount > 0"
              class="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-black h-4 w-4 grid place-items-center rounded-full border-2 border-bg shadow-sm tabular-nums leading-none"
            >
              {{ favoriteCount }}
            </span>
          </div>
          <span class="hidden sm:block font-bold">Favorites</span>
        </RouterLink>

        <RouterLink :to="{ name: Routes.MY_TEAM }" class="nav-item group">
          <div class="relative flex">
            <Shield
              class="w-5 h-5 transition-transform group-hover:scale-110"
              :class="{ 'fill-text-h/10 text-text-h': teamCount > 0 }"
            />
            <span
              v-if="teamCount > 0"
              class="absolute -top-2 -right-2 bg-text-h text-bg text-[10px] font-black h-4 w-4 grid place-items-center rounded-full border-2 border-bg shadow-sm tabular-nums leading-none"
            >
              {{ teamCount }}
            </span>
          </div>
          <span class="hidden sm:block font-bold">My Team</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
