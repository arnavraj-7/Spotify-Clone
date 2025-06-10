import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({

  server:{port:3000},
  plugins: [react(), tailwindcss(), checker({ typescript: false })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
 sourcemap: true,
},
})
