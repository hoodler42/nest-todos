/** biome-ignore-all lint/style/useNamingConvention: Env variables use PASCAL_CASE */

import { Context, Effect, Layer } from "effect";
import { z } from "zod";

export enum Environments {
  Development = "dev",
  Production = "prod",
  Test = "test",
}

const configSchema = z.object({
  APP_PORT: z.coerce.number().min(1024).max(65535),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().min(1024).max(65535),
  DATABASE_NAME: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  NODE_ENV: z.enum(Environments),
});

export type AppConfig = z.infer<typeof configSchema>;

export const Config = Context.GenericTag<AppConfig>("Config");

export const ConfigLayer = Layer.effect(
  Config,
  Effect.try({
    try: () => {
      if (!process.env.NODE_ENV) {
        throw new Error("NODE_ENV must be defined");
      }
      return configSchema.parse(process.env);
    },
    catch: error => new Error(`Config validation failed: ${error}`),
  }),
);
