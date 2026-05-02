import type { Meta, StoryObj } from '@storybook/vue3'
import MainLayout from './MainLayout.vue'

const meta: Meta<typeof MainLayout> = {
  title: 'Core/Layouts/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof MainLayout>

export const Default: Story = {
  render: (args) => ({
    components: { MainLayout },
    setup: () => ({ args }),
    template: `<MainLayout v-bind="args" />`,
  }),
}
