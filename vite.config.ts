import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['ba03-88-134-21-98.ngrok-free.app'],
  },
  resolve: {
    alias: {
      '@app': '/src',
    },
  },
});
