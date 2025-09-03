import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 이 부분을 추가하세요! 'YOUR_REPOSITORY_NAME'을 본인 것으로 바꾸세요.
  base: 'Pomodoro-Daniel' 
})
