import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/core/layouts/DefaultLayout.vue'

// Eagerly import the core views
import PokemonList from '@/modules/pokemon/views/PokemonList.vue'
import PokemonDetail from '@/modules/pokemon/views/PokemonDetail.vue'

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
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: Routes.HOME,
          component: PokemonList,
        },
        {
          path: 'pokemon/:id',
          name: Routes.POKEMON_DETAIL,
          component: PokemonDetail,
          props: true,
        },
        // Secondary features stay lazy
        {
          path: 'favorites',
          name: Routes.FAVORITES,
          component: () => import('@/modules/collection/FavoritesView.vue'),
        },
        {
          path: 'my-team',
          name: Routes.MY_TEAM,
          component: () => import('@/modules/collection/MyTeamView.vue'),
        },
      ],
    },
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
