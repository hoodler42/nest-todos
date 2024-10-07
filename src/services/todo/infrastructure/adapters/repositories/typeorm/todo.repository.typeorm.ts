import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import type { TodoRepository } from "../../../../core/application/ports/repositories/todo.repository.js"
import type { TodoEntity } from "../../../../core/domain/entities/todo.entity.js"
import { TodoMapper } from "../../../../mapper/todo.mapper.js"
import { TodoModel } from "../../../database/models/todo.model.js"

@Injectable()
export class TodoRepositoryTypeOrm implements TodoRepository {
  constructor(
    @InjectRepository(TodoModel) private readonly typeOrmRepository: Repository<TodoModel>,
    private readonly todoMapper: TodoMapper,
  ) {}

  public async insertOne(todoDomain: TodoEntity): Promise<void> {
    const todoOrm = this.todoMapper.toOrmFromDomain(todoDomain)
    await this.typeOrmRepository.insert(todoOrm)
  }

  public async insertMany(todosDomain: TodoEntity[]): Promise<void> {
    const todosOrm = todosDomain.map(this.todoMapper.toOrmFromDomain)
    await this.typeOrmRepository.insert(todosOrm)
  }

  public async findAll(): Promise<TodoEntity[]> {
    const todosOrm = await this.typeOrmRepository.find()

    return todosOrm.map(this.todoMapper.toEntityFromModel)
  }
}
