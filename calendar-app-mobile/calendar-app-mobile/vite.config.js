import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Emit Vite's build manifest under a different filename to avoid
    // overwriting the app's PWA manifest.json in the public folder.
    manifest: 'vite-manifest.json'
  }
})
