import { Inject, Injectable } from "@nestjs/common"
import { TodoEntity } from "../../../domain/entities/todo.entity.js"
import { ID_GENERATOR_TOKEN, type IdGenerator } from "../../ports/id-generator/id-generator.js"
import { TodoRepository } from "../../ports/repositories/todo.repository.js"

@Injectable()
export class CreateTodoUseCase {
  constructor(
    @Inject(ID_GENERATOR_TOKEN) private readonly idGenerator: IdGenerator,
    @Inject(TodoRepository) private readonly todoRepository: TodoRepository,
  ) {}

  async execute(title: string) {
    const id = this.idGenerator()
    const todoCreated = TodoEntity.create({ id, title })
    await this.todoRepository.insertOne(todoCreated)
    return todoCreated
  }
}
