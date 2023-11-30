import { Inject, Injectable } from "@nestjs/common"
import type { Todo } from "../../../domain/entities/todo.js"
import { TodoRepository } from "../../ports/repositories/todo.repository.js"

@Injectable()
export class ListTodosUseCase {
  constructor(@Inject(TodoRepository) private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
