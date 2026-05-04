import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createTestingPinia } from '@pinia/testing'
import PokemonCard from './PokemonCard.vue'

describe('PokemonCard', () => {
  const defaultProps = {
    id: 25,
    name: 'pikachu',
    image: 'url',
  }

  it('renders pokemon info and ID correctly', async () => {
    const screen = render(PokemonCard, {
      props: defaultProps,
      global: { plugins: [createTestingPinia()] },
    })

    await expect.element(screen.getByText('pikachu')).toBeVisible()
    await expect.element(screen.getByText('#025')).toBeVisible()
  })

  it('shows active state for favorite button', async () => {
    const screen = render(PokemonCard, {
      props: defaultProps,
      global: {
        plugins: [
          createTestingPinia({
            initialState: { pokemon: { favorites: [25] } },
          }),
        ],
      },
    })

    const favButton = screen.getByRole('button').first() // The first button is Heart
    await expect.element(favButton).toHaveClass('text-accent')
  })
})
