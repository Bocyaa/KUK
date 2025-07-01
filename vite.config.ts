import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['1e87-2a02-810d-a914-6f00-a8f5-9884-aa33-abe4.ngrok-free.app'],
  },
  resolve: {
    alias: {
      '@app': '/src',
    },
  },
});
