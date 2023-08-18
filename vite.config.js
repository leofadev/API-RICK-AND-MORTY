import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://leofadev.github.io/API-RICK-AND-MORTY/",
  plugins: [react()],
})
