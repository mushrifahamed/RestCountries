import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/tests/setupTests.js', 'src/tests/matchMedia.js'],
    globals: true,
    coverage: {
      reporter: ['text', 'lcov']
    }
  }
})