import { test, expect } from './fixtures.js'

test.describe('Pokedex Critical Journey', () => {
  test('should navigate from list to detail and verify content', async ({
    page,
    makeAxeBuilder,
  }) => {
    await page.goto('/')
    await expect(page.locator('#app')).not.toBeEmpty()

    const listA11y = await makeAxeBuilder().analyze()
    expect(listA11y.violations).toHaveLength(0)

    const firstPokemon = page.getByRole('link', { name: /pokemon-1/i }).first()
    await expect(firstPokemon).toBeVisible()
    await firstPokemon.click()

    await expect(page).toHaveURL(/\/pokemon\/1/)
    await expect(page.getByText(/A strange seed was planted/i)).toBeVisible()

    const detailA11y = await makeAxeBuilder().analyze()
    expect(detailA11y.violations).toHaveLength(0)
  })

  test('pokemon detail card visual snapshot and favorite state', async ({ page }) => {
    await page.goto('/pokemon/1')
    await expect(page.locator('#app')).not.toBeEmpty()

    const detailCard = page.locator('.pokemon-card-detail')

    await expect(detailCard).toBeVisible({ timeout: 10000 })

    const pokemonImage = detailCard.locator('img').first()
    await expect(pokemonImage).toBeVisible()

    await expect(detailCard).toHaveScreenshot('pokemon-detail-initial.png')
  })
})
