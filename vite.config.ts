import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    'process.env.VITE_IS_PUBLIC': JSON.stringify(true),
    'process.env.VITE_BUILD_TYPE': JSON.stringify('production')
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
