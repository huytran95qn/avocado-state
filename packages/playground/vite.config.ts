import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Allow importing the local library package without an extra build step.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@avocado-state/core": path.resolve(__dirname, "../core/src")
    }
  },
  server: {
    fs: {
      // Let Vite watch files from the workspace root so edits in the library hot-reload here.
      allow: [path.resolve(__dirname, "../../")]
    }
  }
});
