import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://care-connect-iq7u.onrender.com", //backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
