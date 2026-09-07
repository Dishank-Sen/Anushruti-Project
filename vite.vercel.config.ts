import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// This browser-only MVP needs no server runtime on Vercel. Keep the existing
// Vinext/Cloudflare build separate and reuse the same application and styles.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  css: { postcss: { plugins: [tailwindcss()] } },
  build: { outDir: 'dist/vercel', emptyOutDir: true },
});
