import type { Server } from "node:http";
import { serve } from "@hono/node-server";
import { Effect } from "effect";
import { GraphQLClient } from "graphql-request";
import { Hono } from "hono";
import type { Kysely } from "kysely";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import type {
  DB,
} from "../../src/modules/todo/infrastructure/persistence/kysely/todo.models.kysely.js";
import { createYogaServer } from "../../src/modules/todo/interface/http/graphql/server.js";
import { createTodoRoutes } from "../../src/modules/todo/interface/http/rest/todo.routes.js";
import { type TodoModel, todoMapper } from "../../src/modules/todo/todo.mapper.js";
import { getSdk, type ListTodosQuery, type Sdk } from "./graphql/todo.sdk.js";
import { prepareKyselyPGLiteTestDatabase } from "./utils/prepare-test-database.js";
import { createTestAppLayer } from "./utils/test-layers.js";

let testDataBase: Kysely<DB>;
let server: Server;
let sdk: Sdk;
let gqlPromise: Promise<ListTodosQuery>;

const TEST_PORT = 3002;

beforeAll(async () => {
  try {
    testDataBase = await prepareKyselyPGLiteTestDatabase();

    const testLayer = createTestAppLayer(testDataBase, TEST_PORT);

    const program = Effect.gen(function* () {
      const app = new Hono();

      const todoRoutes = createTodoRoutes(testLayer);
      const yoga = createYogaServer(testLayer);

      app.route("/todos", todoRoutes);
      app.all("/graphql", async c => yoga.handleRequest(c.req.raw, {}));

      return serve({
        fetch: app.fetch,
        port: TEST_PORT,
      });
    });

    const runnable = program.pipe(Effect.provide(testLayer)) as Effect.Effect<Server, never, never>;

    server = await Effect.runPromise(runnable);

    const client = new GraphQLClient(`http://localhost:${TEST_PORT}/graphql`);
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

describe("Scenario: List todos", () => {
  const existingTodos: TodoModel[] = [
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      title: "First todo",
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174002",
      title: "Second todo",
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeAll(async () => {
    gqlPromise = setup({ givens: { todos: existingTodos } });
  });

  test("Then all the todos are returned", async () => {
    const { listTodos: todos } = await gqlPromise;

    expect(todos).toHaveLength(existingTodos.length);

    const expectedTodos = await Promise.all(
      existingTodos
        .map(model => todoMapper.toDomainFromModel(model))
        .map(async entityEffect => {
          const entity = await Effect.runPromise(entityEffect);
          return todoMapper.toDTOFromDomain(entity);
        }),
    );

    expect(todos).toEqual(
      expect.arrayContaining(expectedTodos.map(todo => expect.objectContaining(todo))),
    );
  });
});

async function setup({ givens }: { givens: { todos: TodoModel[] } }) {
  await testDataBase.insertInto("todo").values(givens.todos).execute();

  return sdk.listTodos();
}
