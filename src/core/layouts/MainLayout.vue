<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Heart, Shield, Sparkles } from 'lucide-vue-next'
import { usePokemonStore } from '@/modules/pokemon/stores/pokemonStore'
import { Routes } from '@/router'

const store = usePokemonStore()
const currentYear = new Date().getFullYear()

const favoriteCount = computed(() => store.favorites.length)
const teamCount = computed(() => store.team.length)
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-accent/30 bg-bg">
    <header class="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <RouterLink
          :to="{ name: Routes.HOME }"
          class="logo group text-2xl font-black tracking-tighter"
        >
          <span
            class="text-accent group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)] transition-all"
            >Poke</span
          >
          <span class="text-text-h">Dexy</span>
        </RouterLink>

        <!-- Navigation -->
        <nav class="flex items-center gap-2">
          <!-- Favorites -->
          <RouterLink :to="{ name: Routes.FAVORITES }" class="nav-item group relative">
            <div class="relative">
              <Heart
                class="w-5 h-5 transition-transform group-hover:scale-110"
                :class="{ 'fill-accent text-accent': favoriteCount > 0 }"
              />
              <span
                v-if="favoriteCount > 0"
                class="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-black h-4 min-w-[1rem] px-1 rounded-full flex items-center justify-center border-2 border-bg tabular-nums shadow-sm"
              >
                {{ favoriteCount }}
              </span>
            </div>
            <span class="hidden sm:block font-bold">Favorites</span>
          </RouterLink>

          <!-- My Team -->
          <RouterLink :to="{ name: Routes.MY_TEAM }" class="nav-item group relative">
            <div class="relative">
              <Shield
                class="w-5 h-5 transition-transform group-hover:scale-110"
                :class="{ 'fill-primary/20 text-primary': teamCount > 0 }"
              />
              <span
                v-if="teamCount > 0"
                class="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black h-4 min-w-[1rem] px-1 rounded-full flex items-center justify-center border-2 border-bg tabular-nums shadow-sm"
              >
                {{ teamCount }}
              </span>
            </div>
            <span class="hidden sm:block font-bold">My Team</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-6 py-10">
      <RouterView v-slot="{ Component }">
        <transition
          enter-active-class="animate-in fade-in zoom-in-95 duration-300"
          leave-active-class="animate-out fade-out zoom-out-95 duration-200"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer class="border-t border-border py-12 bg-bg-h/30">
      <div class="container mx-auto px-6 text-center space-y-4">
        <div class="flex items-center justify-center gap-2 text-accent opacity-50">
          <Sparkles class="w-4 h-4" />
          <div class="h-px w-12 bg-current"></div>
          <Sparkles class="w-4 h-4" />
        </div>

        <p class="text-sm text-text/50 font-medium tracking-tight">
          &copy; {{ currentYear }} <span class="text-accent font-black">Poke</span>Dexy.
          <span class="hidden sm:inline opacity-50"> // </span>
          <span class="hidden sm:inline">Built with Vue 3, Pinia & Valibot</span>
        </p>
      </div>
    </footer>
  </div>
</template>
