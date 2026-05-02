import { expect, it, describe } from 'vitest'
import { render } from 'vitest-browser-vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: 'Home' } },
    { path: '/favorites', component: { template: 'Favorites' } },
    { path: '/my-team', component: { template: 'Team' } },
  ],
})

describe('MainLayout', () => {
  it('renders the logo and navigation links', async () => {
    const { getByRole } = render(MainLayout, { global: { plugins: [router] } })

    const header = getByRole('banner')

    await expect.element(header.getByText('Poke')).toBeVisible()
    await expect.element(header.getByText('Dexy')).toBeVisible()
  })

  it('renders the correct current year in the footer', async () => {
    const currentYear = new Date().getFullYear().toString()
    const { getByText } = render(MainLayout, {
      global: { plugins: [router] },
    })

    await expect.element(getByText(new RegExp(currentYear))).toBeVisible()
  })

  it('renders slot content correctly', async () => {
    const testContent = 'Hello from the slot!'
    const { getByText } = render(MainLayout, {
      global: { plugins: [router] },
      slots: {
        default: `<div>${testContent}</div>`,
      },
    })

    await expect.element(getByText(testContent)).toBeVisible()
  })
})
