import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/core/layouts/MainLayout.vue'

export const Routes = {
  HOME: 'home',
  POKEMON_DETAIL: 'pokemon-detail',
  FAVORITES: 'favorites',
  MY_TEAM: 'my-team',
  ERROR: 'error',
  NOT_FOUND: 'not-found',
} as const

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        // Home - Pokemon List
        {
          path: '',
          name: Routes.HOME,
          component: () => import('@/modules/pokemon/views/PokemonList.vue'),
        },
        // Pokemon Detail
        {
          path: 'pokemon/:id',
          name: Routes.POKEMON_DETAIL,
          component: () => import('@/modules/pokemon/views/PokemonDetail.vue'),
          props: true, // Allows passing :id as a prop to the component
        },
        // Favorites
        {
          path: 'favorites',
          name: Routes.FAVORITES,
          component: () => import('@/modules/favorites/views/FavoritesView.vue'),
        },
        // My Team
        {
          path: 'my-team',
          name: Routes.MY_TEAM,
          component: () => import('@/modules/my-team/views/MyTeamView.vue'),
        },
      ],
    },
    // Error & 404 Pages
    {
      path: '/error',
      name: Routes.ERROR,
      component: () => import('@/core/views/ErrorView.vue'),
    },
    {
      path: '/:catchAll(.*)*',
      name: Routes.NOT_FOUND,
      component: () => import('@/core/views/NotFoundView.vue'),
    },
  ],
})

export default router
