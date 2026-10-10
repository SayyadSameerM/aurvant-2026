import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animation: ["framer-motion"],
        },
      },
    },
  },
  // SPA fallback for hosting
  server: {
    port: 5173,
    host: true,
  },
});
