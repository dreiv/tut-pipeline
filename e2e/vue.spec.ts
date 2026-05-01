import { test, expect } from './fixtures.js'

test('displays the pokedex from mocks', async ({ page }) => {
  await page.goto('/')

  const card = page.getByText('pokemon-20')
  await expect(card).toBeVisible()
})
