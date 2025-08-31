import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
  },
  base: '/', 
    server: {
    proxy: {
      '/api': {
        target: 'https://skillswap-backend-6jha.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },// 👈 important for correct routing
});