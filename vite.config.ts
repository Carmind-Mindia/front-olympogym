import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), mkcert() ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    port: 3000,
    https: true,
  },
  optimizeDeps:{
    include:['@fawmi/vue-google-maps', 'fast-deep-equal']
  },
  base: '/',
})
