import type { Server } from "node:http";
import { serve } from "@hono/node-server";
import { Effect } from "effect";
import { GraphQLClient } from "graphql-request";
import { Hono } from "hono";
import type { Kysely } from "kysely";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import {
  givenInvalidTitle,
  givenValidTitle,
} from "../../src/modules/todo/core/domain/entities/todo.givens.js";
import type {
  DB,
} from "../../src/modules/todo/infrastructure/persistence/kysely/todo.models.kysely.js";
import { createYogaServer } from "../../src/modules/todo/interface/http/graphql/server.js";
import { createTodoRoutes } from "../../src/modules/todo/interface/http/rest/todo.routes.js";
import { type CreateTodoMutation, getSdk, type Sdk } from "./graphql/todo.sdk.js";
import { prepareKyselyPGLiteTestDatabase } from "./utils/prepare-test-database.js";
import { createTestAppLayer } from "./utils/test-layers.js";

let testDataBase: Kysely<DB>;
let server: Server;
let sdk: Sdk;
let gqlPromise: Promise<CreateTodoMutation>;

beforeAll(async () => {
  try {
    testDataBase = await prepareKyselyPGLiteTestDatabase();

    const testLayer = createTestAppLayer(testDataBase);

    const program = Effect.gen(function* () {
      const app = new Hono();

      const todoRoutes = createTodoRoutes(testLayer);
      const yoga = createYogaServer(testLayer);

      app.route("/todos", todoRoutes);
      app.all("/graphql", async c => yoga.handleRequest(c.req.raw, {}));

      return serve({
        fetch: app.fetch,
        port: Number(process.env.APP_PORT),
      });
    });

    const runnable = program.pipe(Effect.provide(testLayer)) as Effect.Effect<Server, never, never>;

    server = await Effect.runPromise(runnable);

    const client = new GraphQLClient(`http://localhost:${process.env.APP_PORT}/graphql`);
    sdk = getSdk(client);
  } catch (error) {
    console.error("Error during setup:", error);
    process.exit(2);
  }
});

afterAll(async () => {
  if (testDataBase) {
    await testDataBase.destroy();
  }
  if (server) {
    server.close();
  }
});

describe("Scenario: Create a todo", () => {
  givenValidTitle(validTitle => {
    describe("When creating the todo", () => {
      beforeAll(async () => {
        gqlPromise = sdk.createTodo({ title: validTitle });
      });

      test("Then the todo is returned", async () => {
        const { createTodo: result } = await gqlPromise;

        if (result?.__typename !== "CreateTodoSuccess") {
          throw new Error("Expected CreateTodoSuccess");
        }

        expect(result.todo).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            isDone: false,
            title: validTitle,
          }),
        );
      });

      test("Then the todo is persisted in database", async () => {
        await gqlPromise;

        const persistedTodo = await testDataBase
          .selectFrom("todo")
          .selectAll()
          .where("title", "=", validTitle)
          .executeTakeFirstOrThrow();

        expect(persistedTodo.title).toBe(validTitle);
      });
    });
  });

  givenInvalidTitle((invalidTitle, errorReason) => {
    describe("When creating the todo", () => {
      beforeAll(async () => {
        gqlPromise = sdk.createTodo({ title: invalidTitle });
      });

      test("Then an error is returned", async () => {
        const { createTodo: result } = await gqlPromise;

        if (result?.__typename === "CreateTodoSuccess") {
          throw new Error("Expected an error, but got a successful response");
        }

        expect(result?.__typename).toBe("InvalidTodoError");
        expect(result?.message).toBe(errorReason);
      });

      test("Then the todo is not persisted", async () => {
        await gqlPromise;

        const persistedTodo = await testDataBase
          .selectFrom("todo")
          .selectAll()
          .where("title", "=", invalidTitle)
          .executeTakeFirst();

        expect(persistedTodo).toBeUndefined();
      });
    });
  });
});
