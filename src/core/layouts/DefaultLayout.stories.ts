import type { Meta, StoryObj } from '@storybook/vue3'
import { createRouter, createMemoryHistory } from 'vue-router'
import DefaultLayout from './DefaultLayout.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div>Main Content Area</div>' } }],
})

const meta: Meta<typeof DefaultLayout> = {
  title: 'Core/Layouts/DefaultLayout',
  component: DefaultLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    () => ({
      setup() {
        router.push('/')
      },
      template: '<story />',
      global: { plugins: [router] },
    }),
  ],
}

export default meta
type Story = StoryObj<typeof DefaultLayout>

export const Default: Story = {
  render: (args) => ({
    components: { DefaultLayout },
    setup: () => ({ args }),
    template: `<DefaultLayout v-bind="args" />`,
  }),
}
