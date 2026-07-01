import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mens: resolve(__dirname, 'mens.html'),
        womens: resolve(__dirname, 'womens.html'),
        childrens: resolve(__dirname, 'childrens.html'),
        electric: resolve(__dirname, 'electric.html'),
      },
    },
  },
})
