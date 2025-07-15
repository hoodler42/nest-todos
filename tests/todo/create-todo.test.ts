import type { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { GraphQLClient } from "graphql-request";
import { DataSource, type Repository } from "typeorm";
import { PGliteDriver } from "typeorm-pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { EnvSchema } from "../../src/env.validation.js";
import { givenInvalidTitle, givenValidTitle } from "../../src/modules/todo/core/domain/entities/todo.givens.js";
import { TodoModel } from "../../src/modules/todo/infrastructure/database/models/todo.model.js";
import { TodoModule } from "../../src/modules/todo/todo.module.js";
import { type CreateTodoMutation, getSdk, type Sdk } from "./graphql/todo.sdk.js";

async function setupDataSource() {
  const dataSource = new DataSource({
    type: "postgres",
    entities: [TodoModel],
    synchronize: true,
    driver: new PGliteDriver().driver,
  })

  await dataSource.initialize()
  return dataSource
}

describe("Scenario: Create a todo", () => {
  let postgresDataSource: DataSource
  let app: INestApplication
  let todoRepository: Repository<TodoModel>
  let sdk: Sdk
  let gqlPromise: Promise<CreateTodoMutation>

  beforeAll(async () => {
    try {
      postgresDataSource = await setupDataSource()

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [TodoModule],
      })
        .overrideProvider(DataSource)
        .useValue(postgresDataSource)
        .compile()

      app = moduleFixture.createNestApplication()
      todoRepository = postgresDataSource.getRepository(TodoModel)

      await app.init()
      const configService = app.get(ConfigService<EnvSchema, true>)
      const appPort = configService.get("APP_PORT")

      await app.listen(appPort)

      const url = await app.getUrl()
      const client = new GraphQLClient(`${url}/graphql`)
      sdk = getSdk(client)
    } catch (error) {
      console.error("Error during setup:", error)
      throw error
    }
  })

  afterAll(async () => {
    if (postgresDataSource) {
      await postgresDataSource.destroy()
    }
    if (app) {
      await app.close()
    }
  })

  givenValidTitle(validTitle => {
    describe("When creating the todo", () => {
      beforeAll(async () => {
        gqlPromise = sdk.createTodo({ title: validTitle })
      })

      it("Then the todo is returned", async () => {
        const { createTodo: createdTodo } = await gqlPromise
        expect(createdTodo).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            isCompleted: false,
            title: validTitle,
          }),
        )
      })

      it("Then the todo is persisted in database", async () => {
        await gqlPromise
        const persistedTodo = await todoRepository.findOne({
          where: { title: validTitle },
        })
        if (!persistedTodo) {
          throw new Error(`Todo with title "${validTitle}" not found in database`)
        }

        expect(persistedTodo.title).toBe(validTitle)
      })
    })
  })

  givenInvalidTitle((invalidTitle, errorReason) => {
    describe("When creating the todo", () => {
      beforeAll(async () => {
        gqlPromise = sdk.createTodo({ title: invalidTitle })
      })

      it("Then an error is returned", async () => {
        const { createTodo: rejection } = await gqlPromise

        if (rejection.__typename === "CreateTodoSuccess") {
          throw new Error("Expected an error, but got a successful response")
        }

        expect(rejection.__typename).toBe("InvalidTodoRejection")
        expect(rejection.reason).toBe(errorReason)
      })

      it("Then the todo is not persisted", async () => {
        await gqlPromise
        const persistedTodo = await todoRepository.findOne({
          where: { title: invalidTitle },
        })

        expect(persistedTodo).toBeNull()
      })
    })
  })
})
