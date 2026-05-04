<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen flex flex-col selection:bg-accent/30 bg-bg">
    <NavBar />

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
        <p class="text-sm text-text/50 font-medium tracking-tight">
          &copy; {{ currentYear }} <span class="text-accent font-black">Poke</span>Dexy. All rights
          reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
