import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config'

const commonTestConfig = {
  setupFiles: [fileURLToPath(new URL('./src/test/setup.ts', import.meta.url))],
  globals: true,
}

export default defineConfig({
  test: {
    ...commonTestConfig,
    root: fileURLToPath(new URL('./', import.meta.url)),
    projects: [
      /* UNIT TESTS */
      {
        ...mergeConfig(viteConfig, {
          test: {
            ...commonTestConfig,
            name: 'unit',
            environment: 'node',
            include: ['src/**/*.unit.{test,spec}.ts'],
            exclude: [...configDefaults.exclude, 'e2e/**'],
          },
        }),
      },
      /* COMPONENT TESTS */
      {
        ...mergeConfig(viteConfig, {
          test: {
            ...commonTestConfig,
            name: 'browser',
            include: ['src/**/*.browser.{test,spec}.ts'],
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
              headless: true,
            },
          },
        }),
      },
      /* CONTRACT TESTS */
      {
        ...mergeConfig(viteConfig, {
          test: {
            globals: true,
            name: 'contract',
            environment: 'node',
            include: ['src/**/*.contract.{test,spec}.ts'],
            testTimeout: 10000,
          },
        }),
      },
    ],
  },
})
