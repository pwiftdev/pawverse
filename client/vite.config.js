import { defineConfig } from 'vite';

export default defineConfig({
  envDir: '..', // .env lives at the repo root (see .env.example)
  server: {
    port: 5173,
    fs: { allow: ['..'] }, // shared/ lives outside the client root
    proxy: {
      '/ws': { target: 'ws://localhost:8080', ws: true },
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
  build: { outDir: 'dist', sourcemap: true },
});
