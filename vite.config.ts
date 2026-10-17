import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The prerender build (scripts/prerender.mjs) bundles every dependency so CSS
  // imports inside packages like Swiper don't break under Node.
  ssr: { noExternal: true },
})
