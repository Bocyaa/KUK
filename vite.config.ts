import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "a8e4-2a02-810d-a914-6f00-c426-2e63-caaf-6c13.ngrok-free.app",
    ],
  },
  resolve: {
    alias: {
      "@app": "/src",
    },
  },
});
