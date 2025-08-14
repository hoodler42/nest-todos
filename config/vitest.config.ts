import swc from "unplugin-swc"

export default {
  plugins: [swc.vite()],
  test: {
    globals: true,
    include: ["./tests/**/*.test.ts"],
    root: "./",
    testTimeout: 0,
  },
}
