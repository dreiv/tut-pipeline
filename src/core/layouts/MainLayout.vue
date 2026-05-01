<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { CalendarDays, Heart } from 'lucide-vue-next'

const favoriteIds = ref<number[]>([]) // Tip: Connect this to a Pinia store later!
const favoriteCount = computed(() => favoriteIds.value.length)
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-accent/30">
    <header
      class="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md transition-colors duration-normal"
    >
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <RouterLink
          to="/"
          class="logo group flex items-center gap-0 px-4 py-2.5 rounded-xl text-2xl font-black tracking-tighter hover:bg-accent/5 transition-all"
        >
          <span
            class="text-accent group-hover:drop-shadow-[0_0_8px_rgba(244,113,33,0.4)] transition-all"
          >
            Poke
          </span>
          <span class="text-text-h"> Dexy </span>
        </RouterLink>

        <nav class="flex items-center gap-1 sm:gap-3">
          <RouterLink
            to="/favorites"
            class="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-accent/10 transition-all duration-normal"
          >
            <div class="relative">
              <Heart class="w-5 h-5 text-text transition-colors" />
              <span
                v-if="favoriteCount > 0"
                class="absolute -top-1.5 -right-2 bg-accent text-white text-[10px] font-bold h-4 min-w-[1rem] px-1 rounded-full flex items-center justify-center border-2 border-bg"
              >
                {{ favoriteCount }}
              </span>
            </div>
            <span class="hidden sm:block font-semibold text-text">Favorites</span>
          </RouterLink>

          <RouterLink
            to="/my-team"
            class="group flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-accent/10 transition-all duration-normal"
          >
            <CalendarDays class="w-5 h-5 text-text transition-colors" />
            <span class="hidden sm:block font-semibold text-text">My Team</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-6 py-10">
      <RouterView />
      <slot />
    </main>

    <footer class="border-t border-border py-10 bg-bg/50">
      <div class="container mx-auto px-6 text-center">
        <p class="text-sm text-text/50 font-medium">
          &copy; {{ currentYear }} <span class="text-accent font-bold">Poke</span>Dexy.
          <span class="hidden sm:inline">Made with passion & Vue 3.</span>
        </p>
      </div>
    </footer>
  </div>
</template>
