import type { Meta, StoryObj } from '@storybook/vue3'
import MainLayout from './MainLayout.vue'

const meta: Meta<typeof MainLayout> = {
  title: 'Core/Layouts/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof MainLayout>

/**
 * Standard view with a simple placeholder to verify the layout container.
 */
export const Default: Story = {
  render: (args) => ({
    components: { MainLayout },
    setup() {
      return { args }
    },
    template: `
      <MainLayout v-bind="args">
        <div class="p-12 border-2 border-dashed border-border rounded-3xl text-center bg-bg/50">
          <h2 class="text-text font-bold text-xl">Main Content Area</h2>
          <p class="text-text/60 mt-2">The slot content renders here.</p>
        </div>
      </MainLayout>
    `,
  }),
}

/**
 * Verifies how the layout handles a long vertical page.
 */
export const Scrolling: Story = {
  render: (args) => ({
    components: { MainLayout },
    setup() {
      return { args }
    },
    template: `
      <MainLayout v-bind="args">
        <div class="py-10 space-y-6">
          <div v-for="i in 15" :key="i" class="h-40 bg-accent/5 border border-border rounded-2xl flex items-center justify-center">
            <span class="text-text/20">Content Section {{ i }}</span>
          </div>
        </div>
      </MainLayout>
    `,
  }),
}
