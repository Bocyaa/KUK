import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // allowedHosts: ['ba03-88-134-21-98.ngrok-free.app'],
    allowedHosts: [
      '25b2-2a02-810d-a914-6f00-7963-cf67-12c1-a0f.ngrok-free.app',
    ],
  },
  resolve: {
    alias: {
      '@app': '/src',
    },
  },
});
