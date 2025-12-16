import { Effect } from "effect";
import type { TodoEntity } from "../../domain/entities/todo.entity.js";
import type { InvalidTodoError } from "../../domain/errors/invalid-todo.error.js";
import { TodoRepository } from "../ports/todo.repository.js";

export const listTodos = () =>
    Effect.gen(function* () {
        const todoRepository = yield* TodoRepository;
        return yield* todoRepository.findAll();
    });

export type ListTodosEffect = Effect.Effect<
    TodoEntity[],
    Error | InvalidTodoError,
    typeof TodoRepository
>;
