import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-scalar': ['@scalar/api-reference-react'],
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
          'vendor-animations': ['animejs', 'chartjs-plugin-zoom'],
        },
      },
    },
  },
})
