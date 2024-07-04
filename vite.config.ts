/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults, coverageConfigDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude,
      '**/server.ts/**',
      '**/server-prod.js/**',
      '**/postcss.config.ts/**',
      '**/tailwind.config.ts/**',
      '**/entry-server.tsx/**',
      '**/entry-client.tsx/**',
      '**/tests-examples/**',
      '**/e2e/**',
      '**/dist/**',
      '**/coverage/**',
      '**/main.tsx/**'
    ],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude,
        '**/server.ts/**',
        '**/server-prod.js/**',
        '**/postcss.config.ts/**',
        '**/tailwind.config.ts/**',
        '**/entry-server.tsx/**',
        '**/entry-client.tsx/**',
        '**/tests-examples/**',
        '**/e2e/**',
        '**/dist/**',
        '**/coverage/**',
        '**/main.tsx/**'
      ]
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
})
