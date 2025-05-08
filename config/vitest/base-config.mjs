import swc from "unplugin-swc"

export default {
  test: {
    globals: true,
    root: "./",
    reporters: ["basic"],
  },
  plugins: [swc.vite()],
}
