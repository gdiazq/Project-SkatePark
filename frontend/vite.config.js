import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/obtenerDatos': 'http://localhost:3000/obtenerDatos',
      '/registroUsuario': 'http://localhost:3000/registroUsuario',
      '/verificar': 'http://localhost:3000/verificar',
      '/datos': 'http://localhost:3000/datos',
      '/borrarPerfil': 'http://localhost:3000/borrarPerfil',
      'actualizarPerfil': 'http://localhost:3000/actualizarPerfil',
      'verificarAdmin': 'http://localhost:3000/verificarAdmin',
      'actualizarEstado': 'http://localhost:3000/actualizarEstado',
      'logout': 'http://localhost:3000/logout'
    }
  }
});