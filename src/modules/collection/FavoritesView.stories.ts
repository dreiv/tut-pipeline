import type { Meta, StoryObj } from '@storybook/vue3'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import FavoritesView from './FavoritesView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', name: 'home', component: { template: 'div' } }],
})

const meta: Meta<typeof FavoritesView> = {
  title: 'Views/FavoritesView',
  component: FavoritesView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FavoritesView>

export const Empty: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [router, createTestingPinia({ initialState: { pokemon: { favorites: [] } } })],
      },
    }),
  ],
}

export const WithFavorites: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: {
                favorites: [1, 4, 7],
                pokemonList: [
                  { id: 1, name: 'bulbasaur', image: '...', url: '' },
                  { id: 4, name: 'charmander', image: '...', url: '' },
                  { id: 7, name: 'squirtle', image: '...', url: '' },
                ],
              },
            },
          }),
        ],
      },
    }),
  ],
}
