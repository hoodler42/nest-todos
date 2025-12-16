import { Effect } from "effect";
import type { Context } from "hono";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { AppLayer } from "./app.layer.js";
import { Config } from "./config.layer.js";
import { createTodoRoutes } from "./modules/todo/interface/http/rest/todo.routes.js";
import { createYogaServer } from "./modules/todo/interface/http/graphql/server.js";

const program = Effect.gen(function* () {
    const config = yield* Config;

    const app = new Hono();

    const todoRoutes = createTodoRoutes(AppLayer);
    const yoga = createYogaServer(AppLayer);

    app.route("/todos", todoRoutes);

    app.all("/graphql", async (c: Context) => {
        return yoga.fetch(c.req.raw, c.env);
    });

    const server = serve({
        fetch: app.fetch,
        port: config.APP_PORT,
    });

    console.info(`🚀 Server listening on http://localhost:${config.APP_PORT}`);
    console.info(`📝 REST API: http://localhost:${config.APP_PORT}/todos`);
    console.info(`🎮 GraphQL: http://localhost:${config.APP_PORT}/graphql`);

    yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
            server.close();
            console.info("👋 Server closed");
        }),
    );

    yield* Effect.never;
});

const runnable = program.pipe(
    Effect.provide(AppLayer),
    Effect.scoped,
);

Effect.runFork(runnable);
