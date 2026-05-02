<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { CalendarDays, Heart } from 'lucide-vue-next'

const favoriteIds = ref<number[]>([])
const favoriteCount = computed(() => favoriteIds.value.length)
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-accent/30">
    <header class="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div class="container mx-auto px-6 h-16 flex items-center justify-between">
        <RouterLink to="/" class="logo group text-2xl font-black tracking-tighter">
          <span class="text-accent transition-all">Poke</span>
          <span class="text-text-h">Dexy</span>
        </RouterLink>

        <nav class="flex items-center gap-1">
          <RouterLink to="/favorites" class="nav-item group relative">
            <div class="relative">
              <Heart class="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span
                v-if="favoriteCount > 0"
                class="absolute -top-1 -right-1.5 bg-accent text-white text-[10px] font-bold h-4 min-w-[1rem] px-1 rounded-full flex items-center justify-center border-2 border-bg tabular-nums"
              >
                {{ favoriteCount }}
              </span>
            </div>
            <span class="hidden sm:block">Favorites</span>
          </RouterLink>

          <RouterLink to="/my-team" class="nav-item group">
            <CalendarDays class="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span class="hidden sm:block">My Team</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto px-6 py-10">
      <RouterView v-slot="{ Component }">
        <transition enter-active-class="animate-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
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
