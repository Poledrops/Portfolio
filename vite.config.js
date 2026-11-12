import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://poledrops.github.io/Portfolio/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
})
