import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '8d3d-2a02-810d-a914-6f00-5469-db46-e69b-652f.ngrok-free.app',
    ],
  },
});
