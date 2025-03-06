import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    open: true,
    // host: "localhost",
  },
  // build: {
  //   outDir: "dist",
  // },
  // base: "/react-setup",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/components/pages"),
      "@shared": path.resolve(__dirname, "src/components/shared"),
      "@conatants": path.resolve(__dirname, "src/constants"),
    },
  },
});
