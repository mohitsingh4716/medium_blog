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
          // React
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-core";
          }

          // React Router
          if (
            id.includes("node_modules/react-router-dom") ||
            id.includes("node_modules/react-router")
          ) {
            return "react-router";
          }

          // React Quill
          if (
            id.includes("node_modules/react-quill") ||
            id.includes("node_modules/quill")
          ) {
            return "react-quill";
          }

          // Highlight.js
          if (id.includes("node_modules/highlight.js")) {
            return "highlight-js";
          }

          // Remaining vendor libraries
          if (id.includes("node_modules")) {
            return "vendor";
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