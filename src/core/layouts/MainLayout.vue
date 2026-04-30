<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { CalendarDays, Heart } from 'lucide-vue-next'

// --- STUBS ---
const favoriteIds = ref<number[]>([])
const favoriteCount = computed(() => favoriteIds.value.length)
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="layout-wrapper">
    <!-- Header -->
    <header class="navbar">
      <div class="container nav-content">
        <RouterLink to="/" class="logo"> Poke<span class="logo-accent">Dexy</span> </RouterLink>

        <nav class="nav-links">
          <RouterLink to="/favorites" class="nav-item">
            <div class="icon-wrapper">
              <Heart class="icon" />
              <span v-if="favoriteCount > 0" class="badge">
                {{ favoriteCount }}
              </span>
            </div>
            <span class="nav-text">Favorites</span>
          </RouterLink>

          <RouterLink to="/my-team" class="nav-item">
            <div class="icon-wrapper">
              <CalendarDays class="icon" />
            </div>
            <span class="nav-text">My Team</span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container main-content">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">&copy; {{ currentYear }} PokeEasy.</div>
    </footer>
  </div>
</template>

<style scoped>
/* Layout Shell */
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--text);
  transition: background-color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
  box-sizing: border-box;
}

/* Header & Nav */
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
  padding: 1rem 0;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--accent);
  letter-spacing: -0.05em;
}

.logo-accent {
  color: var(--text-h);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: var(--accent);
}

/* Icons & Badge */
.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 20px;
  height: 20px;
}

.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: var(--accent);
  color: white;
  font-size: 10px;
  font-weight: bold;
  height: 16px;
  min-width: 16px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

/* Main & Footer */
.main-content {
  flex-grow: 1;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  text-align: center;
  font-size: 0.875rem;
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 640px) {
  .nav-text {
    display: none;
  }
  .nav-links {
    gap: 1.25rem;
  }
}
</style>
