import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@Root": path.resolve(__dirname, "./"),
      "@App": path.resolve(__dirname, "./src"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Store": path.resolve(__dirname, "src/store"),
      "@Utils": path.resolve(__dirname, "src/utils"),
      "@Pages": path.resolve(__dirname, "src/pages"),
    },
  },
  assetsInclude: ["./assets/images/*.wav"],
});
