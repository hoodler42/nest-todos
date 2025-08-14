import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { GraphQLClient } from "graphql-request";
import { Kysely } from "kysely";
import { KYSELY_MODULE_CONNECTION_TOKEN } from "nestjs-kysely";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import type { EnvSchema } from "../../src/env.validation.js";
import type {
  DB,
} from "../../src/modules/todo/infrastructure/adapters/repositories/kysely/models.js";
import { type TodoModel, todoMapper } from "../../src/modules/todo/todo.mapper.js";
import { TodoModule } from "../../src/modules/todo/todo.module.js";
import { prepareKyselyPGLiteTestDatabase } from "../utils/prepare-test-database.js";
import { getSdk, type ListTodosQuery, type Sdk } from "./graphql/todo.sdk.js";

let testDataBase: Kysely<DB>;
let app: INestApplication;
let sdk: Sdk;
let gqlPromise: Promise<ListTodosQuery>;

beforeAll(async () => {
  try {
    testDataBase = await prepareKyselyPGLiteTestDatabase();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    })
      .overrideProvider(KYSELY_MODULE_CONNECTION_TOKEN())
      .useValue(testDataBase)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
    const configService = app.get(ConfigService<EnvSchema, true>);
    const appPort = configService.get("APP_PORT");

    await app.listen(appPort);

    const url = await app.getUrl();
    const client = new GraphQLClient(`${url}/graphql`);
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
  if (app) {
    await app.close();
  }
});

describe("Scenario: List todos", () => {
  const existingTodos: TodoModel[] = [
    { id: "1", title: "First todo", isCompleted: false, createdAt: new Date(), updatedAt: new Date() },
    { id: "2", title: "Second todo", isCompleted: false, createdAt: new Date(), updatedAt: new Date() },
  ];

  beforeAll(async () => {
    gqlPromise = setup({ givens: { todos: existingTodos } });
  });

  test("Then all the todos are returned", async () => {
    const { listTodos: todos } = await gqlPromise;

    expect(todos).toHaveLength(existingTodos.length);
    expect(todos).toEqual(
      expect.arrayContaining(
        existingTodos
          .map(todoMapper.toDomainFromModel)
          .map(todoMapper.toGqlDTOFromDomain)
          .map(todo => expect.objectContaining(todo)),
      ),
    );
  });
});

async function setup({ givens }: { givens: { todos: TodoModel[] } }) {
  await testDataBase.insertInto("todo").values(givens.todos).execute();

  return sdk.listTodos();
}
