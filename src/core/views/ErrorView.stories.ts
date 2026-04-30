import type { Meta, StoryObj } from '@storybook/vue3'
import ErrorView from './ErrorView.vue'

const meta: Meta<typeof ErrorView> = {
  title: 'Views/ErrorView',
  component: ErrorView,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    code: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof ErrorView>

/**
 * The standard 500 error state.
 */
export const Default: Story = {
  args: {
    message: 'Internal Server Error',
    code: 500,
  },
}

/**
 * Use this to test how the view handles long custom messages
 * from the backend.
 */
export const CustomMessage: Story = {
  args: {
    message:
      'The Pokemon database is currently undergoing maintenance. Please try again in a few minutes.',
    code: 503,
  },
}

/**
 * Testing the view in a "Not Found" context.
 */
export const NotFound: Story = {
  args: {
    message: 'We could not find the Pokemon you were looking for.',
    code: 404,
  },
}
