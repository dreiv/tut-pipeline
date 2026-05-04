import type { Meta, StoryObj } from '@storybook/vue3'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createMemoryHistory } from 'vue-router'
import NavBar from './NavBar.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: 'div' } },
    { path: '/favorites', name: 'favorites', component: { template: 'div' } },
    { path: '/my-team', name: 'my-team', component: { template: 'div' } },
  ],
})

const meta: Meta<typeof NavBar> = {
  title: 'Components/Navigation/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: {
                favorites: Array(3).fill({ id: 1 }),
                team: Array(6).fill({ id: 1 }),
              },
            },
          }),
        ],
      },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof NavBar>

export const Default: Story = {}

export const Empty: Story = {
  decorators: [
    () => ({
      template: '<story />',
      global: {
        plugins: [
          router,
          createTestingPinia({
            initialState: {
              pokemon: { favorites: [], team: [] },
            },
          }),
        ],
      },
    }),
  ],
}
