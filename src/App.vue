<script setup lang="ts">
import AppHero from "./components/AppHero.vue";
import PriceCalculator from "./components/PriceCalculator.vue";
</script>

<template>
  <main id="app">
    <AppHero title="V+ Pipeline" />

    <div id="center">
      <PriceCalculator />
    </div>

    <div class="ticks" />

    <footer class="footer">
      <p>Built with Vite+ Monorepo</p>
    </footer>
  </main>
</template>

<style scoped>
#center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer {
  padding: 2rem;
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.6;
}
</style>
