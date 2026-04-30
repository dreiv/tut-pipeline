import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: fileURLToPath(new URL('./', import.meta.url)),

      projects: [
        mergeConfig(viteConfig, {
          test: {
            name: 'unit',
            environment: 'node',
            include: ['src/**/*.unit.{test,spec}.{js,ts}'],
            exclude: [...configDefaults.exclude, 'e2e/**'],
          },
        }),
        mergeConfig(viteConfig, {
          test: {
            name: 'browser',
            include: ['src/**/*.browser.{test,spec}.{js,ts}'],
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
              headless: true,
            },
          },
        }),
      ],
    },
  }),
)
