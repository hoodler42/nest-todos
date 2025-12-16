import { Effect } from "effect";

import { TodoEntity } from "../../domain/entities/todo.entity.js";
import type { InvalidTodoError } from "../../domain/errors/invalid-todo.error.js";
import { IdGenerator } from "../ports/id-generator.js";
import { TodoRepository } from "../ports/todo.repository.js";

export namespace CreateTodoUseCase {
  export type Input = {
    readonly title: string;
  };

  export type Output = Effect.Effect<
    TodoEntity,
    InvalidTodoError | Error,
    IdGenerator | TodoRepository
  >;

  export const execute = (input: CreateTodoUseCase.Input): CreateTodoUseCase.Output =>
    Effect.gen(function* () {
      const idGenerator = yield* IdGenerator;
      const todoRepository = yield* TodoRepository;

      const id = idGenerator.generate();
      const todo = yield* TodoEntity.create({ id, title: input.title });

      yield* todoRepository.insertOne(todo);

      return todo;
    });
}
