import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import TypeBadge from './TypeBadge.vue'

describe('TypeBadge', () => {
  it('renders the correct emoji for a given type', async () => {
    const screen = render(TypeBadge, {
      props: { typeName: 'fire' },
    })
    await expect.element(screen.getByText('🔥')).toBeVisible()
  })

  it('shows the type name label when showLabel is true', async () => {
    const screen = render(TypeBadge, {
      props: { typeName: 'grass', showLabel: true },
    })
    await expect.element(screen.getByText('grass')).toBeVisible()
  })

  it('hides the label by default', async () => {
    const screen = render(TypeBadge, {
      props: { typeName: 'water' },
    })
    await expect.element(screen.getByText('water')).not.toBeInTheDocument()
  })

  it('applies dynamic styles based on type name', async () => {
    const screen = render(TypeBadge, {
      props: { typeName: 'electric' },
    })

    const badge = screen.getByTitle('electric')
    await expect
      .element(badge)
      .toHaveAttribute('style', expect.stringContaining('var(--color-type-electric)'))
  })
})
