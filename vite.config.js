import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/',  // Base path for custom domain
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
  }
})
