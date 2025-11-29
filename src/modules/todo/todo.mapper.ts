import type { Selectable } from "kysely";

import type { Mapper } from "../../lib/mapper.js";
import type { todo } from "./infrastructure/persistence/kysely/models.kysely.js";
import type { TodoGqlDTO } from "./interface/http/graphql/dto/todo.graphql.dto.js";
import type { TodoRestDTO } from "./interface/http/rest/dto/output/todo.rest.dto.js";
import { TodoEntity } from "./core/domain/entities/todo.entity.js";

export type TodoModel = Selectable<todo>;

interface TodoMapper extends Mapper<TodoEntity, TodoModel, TodoRestDTO, TodoGqlDTO> {}

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
        const result = TodoEntity.fromPersistence({
            id: todoModel.id,
            title: todoModel.title,
            isCompleted: Boolean(todoModel.isCompleted),
            createdAt: new Date(todoModel.createdAt),
            updatedAt: new Date(todoModel.updatedAt),
        });

        if (result.isError()) {
            throw result.error;
        }

        return result.value;
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
