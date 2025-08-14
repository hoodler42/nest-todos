import type { Selectable } from "kysely";

import type { Mapper } from "../../lib/mapper.js";
import { TodoEntity, TodoProps } from "./core/domain/entities/todo.entity.js";
import type { todo } from "./infrastructure/adapters/repositories/kysely/models.js";
import type { TodoGqlDTO } from "./interface/http/graphql/dto/todo.graphql.dto.js";
import type { TodoRestDTO } from "./interface/http/rest/dto/output/todo.rest.dto.js";

export type TodoModel = Selectable<todo>;

interface TodoMapper extends Mapper<TodoProps, TodoEntity, TodoModel, TodoRestDTO, TodoGqlDTO> {}

export const todoMapper: TodoMapper = {
  toModelFromDomain(todoDomain: TodoEntity): TodoModel {
    return {
      id: todoDomain.id,
      isCompleted: todoDomain.isCompleted,
      title: todoDomain.title,
      createdAt: todoDomain.createdAt,
      updatedAt: todoDomain.updatedAt,
    };
  },

  toDomainFromModel(todoModel: TodoModel): TodoEntity {
    return new TodoEntity({
      id: todoModel.id,
      props: {
        isCompleted: Boolean(todoModel.isCompleted),
        title: todoModel.title,
      },
      createdAt: new Date(todoModel.createdAt),
      updatedAt: new Date(todoModel.updatedAt),
    });
  },

  toRestDTOFromDomain(todoDomain: TodoEntity): TodoRestDTO {
    return {
      id: todoDomain.id,
      isCompleted: todoDomain.isCompleted,
      title: todoDomain.title,
    };
  },

  toGqlDTOFromDomain(todoDomain: TodoEntity): TodoGqlDTO {
    return {
      id: todoDomain.id,
      isCompleted: todoDomain.isCompleted,
      title: todoDomain.title,
    };
  },
};
