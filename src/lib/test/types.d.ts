import type { MockInstance } from "vitest"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SpyOf<Fn extends (...args: any[]) => any> = MockInstance<Parameters<Fn>, ReturnType<Fn>>
