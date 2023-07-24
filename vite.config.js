import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      events: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "node_modules/events/events.js"
      ),
      buffer: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "node_modules/buffer/index.js"
      ),
    },
  },
  define: {
    "process.env": {},
  },
});
