import { Inject, Injectable } from "@nestjs/common"
import type { TodoEntity } from "../../../domain/entities/todo.entity.js"
import { TodoRepository } from "../../ports/repositories/todo.repository.js"

@Injectable()
export class ListTodosUseCase {
  constructor(@Inject(TodoRepository) private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<TodoEntity[]> {
    return this.todoRepository.findAll()
  }
}
