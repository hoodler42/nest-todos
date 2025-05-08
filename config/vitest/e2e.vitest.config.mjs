import { defineConfig } from "vitest/config"
import baseConfig from "./base-config.mjs"

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["./src/**/*.e2e.ts"],
  },
})
