import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import type { TodoRepository } from "../../../../core/application/ports/repositories/todo.repository.js"
import type { Todo } from "../../../../core/domain/entities/todo.js"
import { TodoMapper } from "../../../../mapper/todo.mapper.js"
import { TodoTypeOrm } from "../../../database/entities/todo.typeorm.js"

@Injectable()
export class TodoRepositoryTypeOrm implements TodoRepository {
  constructor(
    @InjectRepository(TodoTypeOrm) private readonly typeOrmRepository: Repository<TodoTypeOrm>,
    private readonly todoMapper: TodoMapper,
  ) {}

  public async insertOne(todoDomain: Todo): Promise<void> {
    const todoOrm = this.todoMapper.toOrmFromDomain(todoDomain)
    await this.typeOrmRepository.insert(todoOrm)
  }

  public async insertMany(todosDomain: Todo[]): Promise<void> {
    const todosOrm = todosDomain.map(this.todoMapper.toOrmFromDomain)
    await this.typeOrmRepository.insert(todosOrm)
  }

  public async findAll(): Promise<Todo[]> {
    const todosOrm = await this.typeOrmRepository.find()

    return todosOrm.map(this.todoMapper.toDomainFromOrm)
  }
}
