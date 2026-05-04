import type { Meta, StoryObj } from '@storybook/vue3'
import DefaultLayout from './DefaultLayout.vue'

const meta: Meta<typeof DefaultLayout> = {
  title: 'Core/Layouts/DefaultLayout',
  component: DefaultLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
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
