import { Injectable } from "@nestjs/common";
import type { Mapper } from "../../../lib/mapper.js";
import { TodoEntity, type TodoProps } from "../core/domain/entities/todo.entity.js";
import type { TodoModel } from "../infrastructure/database/models/todo.model.js";
import type { TodoGQL } from "../interface/http/graphql/dto/todo.graphql.js";
import type { TodoRestDTO } from "../interface/http/rest/dto/output/todo.rest.dto.js";

@Injectable()
export class TodoMapper implements Mapper<TodoProps> {
  toOrmFromDomain(todoDomain: TodoEntity): TodoModel {
    return {
      createdAt: todoDomain.createdAt,
      id: todoDomain.id,
      isCompleted: todoDomain.isCompleted,
      title: todoDomain.title,
      updatedAt: todoDomain.updatedAt,
    }
  }

  toEntityFromModel(todoOrm: TodoModel): TodoEntity {
    return new TodoEntity({
      createdAt: todoOrm.createdAt,
      id: todoOrm.id,
      props: {
        isCompleted: todoOrm.isCompleted,
        title: todoOrm.title,
      },
      updatedAt: todoOrm.updatedAt,
    })
  }

  toDTOFromEntity(todoDomain: TodoEntity): TodoRestDTO {
    return {
      id: todoDomain.id,
      isCompleted: todoDomain.isCompleted,
      title: todoDomain.title,
    }
  }

  toGQLFromDomain(todoDomain: TodoEntity): TodoGQL {
    return {
      id: todoDomain.id,
      isCompleted: todoDomain.isCompleted,
      title: todoDomain.title,
    }
  }
}
