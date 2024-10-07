import { Injectable } from "@nestjs/common"
import type { Mapper } from "../../../lib/mapper.js"
import { TodoEntity, type TodoProps } from "../core/domain/entities/todo.entity.js"
import type { TodoModel } from "../infrastructure/database/models/todo.model.js"
import type { TodoGraphqlDTO } from "../interface/http/graphql/dto/todo.graphql.dto.js"
import type { TodoRestDTO } from "../interface/http/rest/dto/output/todo.rest.dto.js"

@Injectable()
export class TodoMapper implements Mapper<TodoProps> {
  toOrmFromDomain(todoDomain: TodoEntity): TodoModel {
    return {
      id: todoDomain.id,
      title: todoDomain.title,
      isCompleted: todoDomain.isCompleted,
      createdAt: todoDomain.createdAt,
      updatedAt: todoDomain.updatedAt,
    }
  }

  toEntityFromModel(todoOrm: TodoModel): TodoEntity {
    return new TodoEntity({
      id: todoOrm.id,
      createdAt: todoOrm.createdAt,
      updatedAt: todoOrm.updatedAt,
      props: {
        title: todoOrm.title,
        isCompleted: todoOrm.isCompleted,
      },
    })
  }

  toDTOFromEntity(todoDomain: TodoEntity): TodoRestDTO {
    return {
      id: todoDomain.id,
      title: todoDomain.title,
      isCompleted: todoDomain.isCompleted,
    }
  }

  toGQLFromDomain(todoDomain: TodoEntity): TodoGraphqlDTO {
    return {
      id: todoDomain.id,
      title: todoDomain.title,
      isCompleted: todoDomain.isCompleted,
    }
  }
}
