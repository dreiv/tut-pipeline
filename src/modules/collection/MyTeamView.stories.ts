import type { Meta, StoryObj } from '@storybook/vue3'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import MyTeamView from './MyTeamView.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', name: 'home', component: { template: 'div' } }],
})

const meta: Meta<typeof MyTeamView> = {
  title: 'Views/MyTeamView',
  component: MyTeamView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MyTeamView>

export const Empty: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: { pokemon: { team: [] } },
          }),
        ],
      },
    }),
  ],
}

export const FullSquad: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: {
                team: [1, 2, 3, 4, 5, 6],
                pokemonList: [
                  { id: 1, name: 'bulbasaur', image: '...', url: '' },
                  { id: 2, name: 'ivysaur', image: '...', url: '' },
                  { id: 3, name: 'venusaur', image: '...', url: '' },
                  { id: 4, name: 'charmander', image: '...', url: '' },
                  { id: 5, name: 'charmeleon', image: '...', url: '' },
                  { id: 6, name: 'charizard', image: '...', url: '' },
                ],
              },
            },
          }),
        ],
      },
    }),
  ],
}
