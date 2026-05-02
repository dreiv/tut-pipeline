import type { Meta, StoryObj } from '@storybook/vue3'
import NotFoundView from './NotFoundView.vue'

const meta: Meta<typeof NotFoundView> = {
  title: 'Views/NotFoundView',
  component: NotFoundView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof NotFoundView>

/**
 * The standard 404 state with hardcoded Poke-themed messaging.
 */
export const Default: Story = {
  render: () => ({
    components: { NotFoundView },
    template: '<NotFoundView />',
  }),
}
