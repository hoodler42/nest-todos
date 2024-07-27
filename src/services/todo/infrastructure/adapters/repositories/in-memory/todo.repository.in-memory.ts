import { Injectable } from "@nestjs/common"
import type { TodoRepository } from "../../../../core/application/ports/repositories/todo.repository.js"
import type { Todo } from "../../../../core/domain/entities/todo.js"

@Injectable()
export class TodoRepositoryInMemory implements TodoRepository {
  public readonly todos: Todo[]

  constructor() {
    this.todos = []
  }

  public async insertOne(todoDomain: Todo): Promise<void> {
    this.todos.push(todoDomain)
  }

  public async insertMany(todosDomain: Todo[]): Promise<void> {
    this.todos.push(...todosDomain)
  }

  public async findAll(): Promise<Todo[]> {
    return this.todos
  }
}
