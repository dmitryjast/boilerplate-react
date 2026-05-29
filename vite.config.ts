import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'  // добавь это

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // и это
  ],
})