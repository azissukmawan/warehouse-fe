import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3000,
    open: true
  },
  preview: {
    allowedHosts: [
      'warehouse-pos.amawan.app'
    ],
    host: true, // Opsional: pastikan server listen ke network
    port: 3000, // Sesuaikan dengan port yang lo pakai di Nginx
  }
})
