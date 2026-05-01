import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          animation: ['gsap', 'lenis'],
          three: ['three']
        }
      }
    }
  },
  resolve: {
    alias: [{
      find: "@vendor",
      replacement: resolve(__dirname, "src/assets/vendor")
    }, {
      find: "@",
      replacement: resolve(__dirname, "src")
    }]
  },
  optimizeDeps: {
    entries: ["index.html"]
  }
});