import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/authenticate': 'http://localhost:8080',  // Direciona as requisições para o backend
    },
  },
})
