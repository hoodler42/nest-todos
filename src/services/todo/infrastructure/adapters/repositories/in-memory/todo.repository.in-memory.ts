import { Injectable } from "@nestjs/common"
import type { TodoRepository } from "../../../../core/application/ports/repositories/todo.repository.js"
import type { TodoEntity } from "../../../../core/domain/entities/todo.entity.js"

@Injectable()
export class TodoRepositoryInMemory implements TodoRepository {
  public readonly todos: TodoEntity[]

  constructor() {
    this.todos = []
  }

  public async insertOne(todoDomain: TodoEntity): Promise<void> {
    this.todos.push(todoDomain)
  }

  public async insertMany(todosDomain: TodoEntity[]): Promise<void> {
    this.todos.push(...todosDomain)
  }

  public async findAll(): Promise<TodoEntity[]> {
    return this.todos
  }
}
