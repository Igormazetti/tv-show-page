import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tv-show-details/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
});
