/** biome-ignore-all lint/style/useNamingConvention: Env variables use UPPER_SNAKE_CASE */
import { z } from "zod";

enum Environments {
  Development = "dev",
  Production = "prod",
  Test = "test",
}

const configSchema = z.object({
  APP_PORT: z.coerce.number().min(1024).max(65535),
  DATABASE_NAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number().min(1024).max(65535),
  DATABASE_URL: z.ipv4(),
  DATABASE_USER: z.string(),
  NODE_ENV: z.enum(Environments),
});

export type EnvSchema = z.infer<typeof configSchema>;

export function validateConfig(config: unknown): EnvSchema {
  if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV must be defined");
  }
  return configSchema.parse(config);
}
