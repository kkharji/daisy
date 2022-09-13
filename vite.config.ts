import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 4301
  },
  build: {
    target: "esnext"
  }
})
