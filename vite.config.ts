import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@fe": path.resolve(__dirname, "./src/FE"),
      "@be": path.resolve(__dirname, "./src/BE"),
      "@components": path.resolve(__dirname, "./src/FE/components"),
    }
  }

});
