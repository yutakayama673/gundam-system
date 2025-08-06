import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gundam-system': {
        target: 'http://localhost:8080', // Spring Bootのサーバー
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
