import type { Effect } from "effect";
import type { Insertable, Selectable } from "kysely";
import { TodoEntity } from "./core/domain/entities/todo.entity.js";
import type { InvalidTodoError } from "./core/domain/errors/invalid-todo.error.js";
import type { todo } from "./infrastructure/persistence/kysely/todo.models.kysely.js";
import type { TodoDTO } from "./interface/dto/output/todo.dto.js";

export type TodoModel = Selectable<todo>;

interface TodoMapper {
  toModelFromDomain: (entity: TodoEntity) => Insertable<todo>;
  toDomainFromModel: (model: TodoModel) => Effect.Effect<TodoEntity, InvalidTodoError>;
  toDTOFromDomain: (entity: TodoEntity) => TodoDTO;
}

export const todoMapper: TodoMapper = {
  toModelFromDomain: (todoDomain: TodoEntity): Insertable<todo> => ({
    id: todoDomain.id,
    isDone: todoDomain.isDone,
    title: todoDomain.title,
    createdAt: todoDomain.createdAt,
    updatedAt: todoDomain.updatedAt,
  }),

  toDomainFromModel: (todoModel: TodoModel): Effect.Effect<TodoEntity, InvalidTodoError> =>
    TodoEntity.fromPersistence({
      id: todoModel.id,
      title: todoModel.title,
      isDone: Boolean(todoModel.isDone),
      createdAt: new Date(todoModel.createdAt),
      updatedAt: new Date(todoModel.updatedAt),
    }),

  toDTOFromDomain: (todoDomain: TodoEntity): TodoDTO => ({
    id: todoDomain.id,
    isDone: todoDomain.isDone,
    title: todoDomain.title,
  }),
};
