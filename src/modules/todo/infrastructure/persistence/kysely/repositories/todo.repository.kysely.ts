import { Effect, Layer } from "effect";
import type { Kysely } from "kysely";
import { TodoRepository } from "../../../../core/application/ports/todo.repository.js";
import type { TodoEntity } from "../../../../core/domain/entities/todo.entity.js";
import { todoMapper } from "../../../../todo.mapper.js";
import { KyselyConnection } from "../kysely.service.js";
import type { DB } from "../todo.models.kysely.js";

const makeTodoRepositoryKysely = (db: Kysely<DB>): TodoRepository => ({
  insertOne: (todoDomain: TodoEntity) =>
    Effect.tryPromise({
      try: async () => {
        const todoModel = todoMapper.toModelFromDomain(todoDomain);
        await db.insertInto("todo").values(todoModel).executeTakeFirstOrThrow();
      },
      catch: error => new Error(`Failed to insert todo: ${error}`),
    }),
  findAll: () =>
    Effect.gen(function* () {
      const todoModels = yield* Effect.tryPromise({
        try: () => db.selectFrom("todo").selectAll().execute(),
        catch: error => new Error(`Failed to fetch todos: ${error}`),
      });

      const todosEffect = todoModels.map(todoMapper.toDomainFromModel);
      return yield* Effect.all(todosEffect);
    }),
});

export const TodoRepositoryKysely = Layer.effect(
  TodoRepository,
  Effect.gen(function* () {
    const db = yield* KyselyConnection;
    return makeTodoRepositoryKysely(db);
  }),
);
