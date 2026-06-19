import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
        // Longer timeout — gives the server time to be ready
        timeout: 10000,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('[proxy error]', err.message);
          });
        },
      },
    },
  },
});
