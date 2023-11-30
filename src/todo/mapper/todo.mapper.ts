import { Injectable } from "@nestjs/common"
import type { Mapper } from "../../lib/mapper.js"
import { Todo, type TodoProps } from "../core/domain/entities/todo.js"
import type { TodoTypeOrm } from "../infrastructure/database/entities/todo.typeorm.js"
import type { TodoDto } from "../interface/http/dto/todo.dto.js"

@Injectable()
export class TodoMapper implements Mapper<TodoProps> {
  toOrmFromDomain(todoDomain: Todo): TodoTypeOrm {
    return {
      id: todoDomain.id,
      title: todoDomain.title,
      isCompleted: todoDomain.isCompleted,
    }
  }

  toDomainFromOrm(todoOrm: TodoTypeOrm): Todo {
    return new Todo({
      id: todoOrm.id,
      props: {
        title: todoOrm.title,
        isCompleted: todoOrm.isCompleted,
      },
    })
  }

  toDomainFromDto(todoDto: TodoDto): Todo {
    return new Todo({
      id: todoDto.id,
      props: {
        title: todoDto.title,
        isCompleted: todoDto.isCompleted,
      },
    })
  }

  toDTOFromDomain(todoDomain: Todo): TodoDto {
    return {
      id: todoDomain.id,
      title: todoDomain.title,
      isCompleted: todoDomain.isCompleted,
    }
  }
}
