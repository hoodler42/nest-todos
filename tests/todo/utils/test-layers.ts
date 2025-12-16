import { Layer } from "effect";
import type { Kysely } from "kysely";
import { ConfigLayer } from "../../../src/config.layer.js";
import {
    UuidIdGenerator,
} from "../../../src/modules/todo/infrastructure/id-generator/uuid/uuid.id-generator.service.js";
import {
    KyselyConnection,
} from "../../../src/modules/todo/infrastructure/persistence/kysely/kysely.service.js";
import {
    TodoRepositoryKysely,
} from "../../../src/modules/todo/infrastructure/persistence/kysely/repositories/todo.repository.kysely.js";
import type {
    DB,
} from "../../../src/modules/todo/infrastructure/persistence/kysely/todo.models.kysely.js";

export const createTestAppLayer = (db: Kysely<DB>) => {
  const testKysely = Layer.succeed(KyselyConnection, db);
  const testTodoRepository = Layer.provide(TodoRepositoryKysely, testKysely);

  return Layer.mergeAll(ConfigLayer, UuidIdGenerator, testTodoRepository);
};
