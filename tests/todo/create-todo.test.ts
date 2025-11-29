import type { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { GraphQLClient } from "graphql-request";
import { Kysely } from "kysely";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { KYSELY_MODULE_CONNECTION_TOKEN } from "nestjs-kysely";
import { ConfigService } from "@nestjs/config";

import {
    givenValidTitle,
    givenInvalidTitle,
} from "../../src/modules/todo/core/domain/entities/todo.givens.js";
import { TodoModule } from "../../src/modules/todo/todo.module.js";
import { type CreateTodoMutation, getSdk, type Sdk } from "./graphql/todo.sdk.js";
import { prepareKyselyPGLiteTestDatabase } from "../utils/prepare-test-database.js";
import type { EnvSchema } from "../../src/env.validation.js";
import type { DB } from "../../src/modules/todo/infrastructure/persistence/kysely/models.kysely.js";

let testDataBase: Kysely<DB>;
let app: INestApplication;
let sdk: Sdk;
let gqlPromise: Promise<CreateTodoMutation>;

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

describe("Scenario: Create a todo", () => {
    givenValidTitle(validTitle => {
        describe("When creating the todo", () => {
            beforeAll(async () => {
                gqlPromise = sdk.createTodo({ title: validTitle });
            });

            test("Then the todo is returned", async () => {
                const { createTodo: createdTodo } = await gqlPromise;

                expect(createdTodo).toEqual(
                    expect.objectContaining({
                        id: expect.any(String),
                        isCompleted: false,
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
                const { createTodo: rejection } = await gqlPromise;

                if (rejection.__typename === "CreateTodoSuccess") {
                    throw new Error("Expected an error, but got a successful response");
                }

                expect(rejection.__typename).toBe("InvalidTodoRejection");
                expect(rejection.reason).toBe(errorReason);
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
