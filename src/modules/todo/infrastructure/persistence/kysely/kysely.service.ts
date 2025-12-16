import { Context, Effect, Layer } from "effect";
import { Kysely, PostgresDialect, CamelCasePlugin } from "kysely";
import { Pool } from "pg";

import type { DB } from "./todo.models.kysely.js";
import { Config } from "../../../../../config.layer.js";

export const KyselyConnection = Context.GenericTag<Kysely<DB>>("KyselyConnection");

export const KyselyConnectionService = Layer.scoped(
    KyselyConnection,
    Effect.gen(function* () {
        const config = yield* Config;

        const pool = new Pool({
            host: config.DATABASE_HOST,
            port: config.DATABASE_PORT,
            database: config.DATABASE_NAME,
            user: config.DATABASE_USER,
            password: config.DATABASE_PASSWORD,
        });

        const db = new Kysely<DB>({
            dialect: new PostgresDialect({ pool }),
            plugins: [new CamelCasePlugin()],
        });

        yield* Effect.addFinalizer(() => Effect.promise(() => db.destroy()));

        return db;
    }),
);
