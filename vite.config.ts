import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'a4dc-2a02-810d-a914-6f00-8d53-aa1b-5126-730c.ngrok-free.app',
    ],
  },
});
