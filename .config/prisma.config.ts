import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "../src/modules/todo/infrastructure/persistence/prisma/schema.prisma",
  migrations: {
    path: "../src/modules/todo/infrastructure/persistence/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
