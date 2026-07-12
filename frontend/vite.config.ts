import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({mode})=> ({
  plugins: [
    react(),

    // Generates bundle analysis after build
    mode === "analyze" &&
      visualizer({
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split React Quill editor
          if (
            id.includes("node_modules/react-quill") ||
            id.includes("node_modules/quill")
          ) {
            return "react-quill";
          }

          // Split highlight.js
          if (id.includes("node_modules/highlight.js")) {
            return "highlight-js";
          }
        },
      },
    },

    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
  },

  esbuild: {
    drop: ["console", "debugger"],
  },
}));