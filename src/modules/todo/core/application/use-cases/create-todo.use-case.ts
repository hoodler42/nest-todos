import { Inject, Injectable } from "@nestjs/common";
import { Result } from "typescript-result";
import { TodoEntity } from "../../domain/entities/todo.entity.js";
import { InvalidTodoError } from "../errors/invalid-todo.error.js";
import { ID_GENERATOR_TOKEN, type IdGenerator } from "../ports/id-generator/id-generator.js";
import { TodoRepository } from "../ports/repositories/todo.repository.js";

export interface CreateTodoUseCasePort {
  title: string
}

@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject(ID_GENERATOR_TOKEN) private readonly idGenerator: IdGenerator,
    @Inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}

  async execute({ title }: CreateTodoUseCasePort): Promise<Result<TodoEntity, InvalidTodoError>> {
    const id = this.idGenerator.generate()

    const result = TodoEntity.create({ id, title })

    return result.fold(
      async createdTodo => {
        await this.todoRepository.insertOne(createdTodo)
        return Result.ok(createdTodo)
      },
      error => Result.error(error),
    )
  }
}
