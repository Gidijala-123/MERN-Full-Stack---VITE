import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1234",
        changeOrigin: true,
        secure: false, //because we r using http
      },
    },
  },
  plugins: [react()],
});
