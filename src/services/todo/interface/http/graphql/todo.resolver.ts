import { Inject } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo/create-todo.use-case.js"
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos/list-todos.use-case.js"
import { TodoMapper } from "../../../mapper/todo.mapper.js"
import { TodoGraphql } from "./entities/todo.graphql.js"

@Resolver("Todo")
export class TodoResolver {
  constructor(
    @Inject(TodoMapper) private readonly todoMapper: TodoMapper,
    @Inject(ListTodosUseCase) private readonly listTodosUseCase: ListTodosUseCase,
    @Inject(CreateTodoUseCase) private readonly createTodoUseCase: CreateTodoUseCase,
  ) {}

  @Query(() => [TodoGraphql])
  async getTodos(): Promise<TodoGraphql[]> {
    const todos = await this.listTodosUseCase.execute()

    return todos.map(this.todoMapper.toGQLFromDomain)
  }

  @Mutation(() => TodoGraphql)
  async createTodo(@Args("title") title: string): Promise<TodoGraphql> {
    const todoDomain = await this.createTodoUseCase.execute(title)
    return this.todoMapper.toGQLFromDomain(todoDomain)
  }
}
