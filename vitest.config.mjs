import swc from "unplugin-swc"
import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		globals: true,
		root: "./",
		reporters: ["basic"],
		include: ["./src/**/*.spec.ts"],
	},
	plugins: [swc.vite()],
})
