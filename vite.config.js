import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/task_manager/', // 👈 ОБЯЗАТЕЛЬНО ДОБАВЬТЕ ЭТУ СТРОКУ
  plugins: [react()],
})
