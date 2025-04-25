import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['894a-2a02-810d-a914-6f00-955b-d13c-65d3-8c2f.ngrok-free.app'],
  },
  resolve: {
    alias: {
      '@app': '/src',
    },
  },
});
