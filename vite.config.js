// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase", // Ensures CSS modules work with imports like `styles.myClass`
      generateScopedName: "[name]__[local]___[hash:base64:5]", // Optional: custom class naming pattern
    },
    postcss: true, // Enable PostCSS processing if needed
  },
  build: {
    outDir: "dist", // Explicit output directory
    emptyOutDir: true, // Clears the dist folder before building
  },
  server: {
    port: 3000, // Default dev server port
    open: true, // Automatically open browser
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"], // Auto-resolve these extensions
  },
});
