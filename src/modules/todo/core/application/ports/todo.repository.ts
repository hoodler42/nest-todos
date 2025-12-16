import { Context, Effect } from "effect";
import type { TodoEntity } from "../../domain/entities/todo.entity.js";
import type { InvalidTodoError } from "../../domain/errors/invalid-todo.error.js";

export interface TodoRepository {
    readonly insertOne: (todo: TodoEntity) => Effect.Effect<void, Error>;
    readonly findAll: () => Effect.Effect<TodoEntity[], Error | InvalidTodoError>;
}

export const TodoRepository = Context.GenericTag<TodoRepository>("TodoRepository");
