import { Inject } from "@nestjs/common"
import { Query, Resolver } from "@nestjs/graphql"
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos/list-todos.use-case.js"
import { TodoMapper } from "../../../mapper/todo.mapper.js"
import { TodoGraphql } from "./entities/todo.graphql.js"

@Resolver("Todo")
export class TodoResolver {
  constructor(
    @Inject(TodoMapper) private readonly todoMapper: TodoMapper,
    @Inject(ListTodosUseCase) private readonly listTodosUseCase: ListTodosUseCase,
  ) {}

  @Query(() => [TodoGraphql])
  async getTodos(): Promise<TodoGraphql[]> {
    const todos = await this.listTodosUseCase.execute()

    return todos.map(this.todoMapper.toGQLFromDomain)
  }
}
