import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import pkg from './package.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const homepagePathname = pkg.homepage ? new URL(pkg.homepage).pathname : '/';
const basePath = process.env.VITE_BASE_PATH || homepagePathname;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath,
  build: {
    outDir: 'build'
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