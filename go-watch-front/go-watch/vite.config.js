import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/authenticate': 'http://localhost:8080',
      '/logout': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/refresh': 'http://localhost:8080',
      '/admin/movies/': 'http://localhost:8080',

      '/movies': 'http://localhost:8080',
    },
  },
})