import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'umd'],
      name: 'LitInstantsearch'
    },
    rollupOptions: {
      external: /^lit-element/
    }
  }
})
