import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    globals: true,
    hookTimeout: 0,
    include: ["./tests/**/*.test.ts"],
    root: "./",
    testTimeout: 0,
  },
});
