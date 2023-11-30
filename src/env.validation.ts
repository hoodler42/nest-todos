import { z } from "zod"

enum Environments {
  Development = "dev",
  Production = "prod",
  Test = "test",
}

const configSchema = z.object({
  NODE_ENV: z.nativeEnum(Environments),
  DATABASE_URL: z.string().ip(),
  DATABASE_PORT: z.coerce.number().min(1024).max(65535),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  APP_PORT: z.coerce.number().min(1024).max(65535),
})

export type EnvSchema = z.infer<typeof configSchema>

export function validateConfig(config: unknown): EnvSchema {
  if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV must be defined")
  }
  return configSchema.parse(config)
}
