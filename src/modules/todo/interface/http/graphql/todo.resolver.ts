import { Inject } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import {
  CreateTodoUseCase,
} from "../../../core/application/use-cases/create-todo/create-todo.use-case.js"
import {
  ListTodosUseCase,
} from "../../../core/application/use-cases/list-todos/list-todos.use-case.js"
import { TodoMapper } from "../../../mapper/todo.mapper.js"
import { TodoGraphqlDTO } from "./dto/todo.graphql.dto.js"

@Resolver("Todo")
export class TodoResolver {
  constructor(
    @Inject(TodoMapper) private readonly todoMapper: TodoMapper,
    @Inject(ListTodosUseCase) private readonly listTodosUseCase: ListTodosUseCase,
    @Inject(CreateTodoUseCase) private readonly createTodoUseCase: CreateTodoUseCase,
  ) {
  }

  @Query(() => [TodoGraphqlDTO])
  async getTodos(): Promise<TodoGraphqlDTO[]> {
    const todos = await this.listTodosUseCase.execute()

    return todos.map(this.todoMapper.toGQLFromDomain)
  }

  @Mutation(() => TodoGraphqlDTO)
  async createTodo(@Args("title") title: string): Promise<TodoGraphqlDTO> {
    const todoDomain = await this.createTodoUseCase.execute(title)
    return this.todoMapper.toGQLFromDomain(todoDomain)
  }
}
