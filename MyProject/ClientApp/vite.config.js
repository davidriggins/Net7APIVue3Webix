import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import fs from 'node:fs'
// import { ServerOptions } from 'https'

const developmentCertificateName = 'localhost.pfx'

var httpsSettings = fs.existsSync(developmentCertificateName)
  ? {
      pfx: fs.readFileSync(developmentCertificateName),
      passphrase: 'secret'
    }
  : {}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    https: httpsSettings
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})
