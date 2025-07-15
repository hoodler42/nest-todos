import { Inject } from "@nestjs/common";
import { Args, createUnionType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo.use-case.js";
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos/list-todos.use-case.js";
import { TodoMapper } from "../../../mapper/todo.mapper.js";
import { TodoGQL } from "./dto/todo.graphql.js";
import { CreateTodoSuccess } from "./payloads/create-todo-success.payload.js";
import { InvalidTodoRejection } from "./rejections/invalid-todo.rejection.js";

const CreateTodoPayload = createUnionType({
  name: "CreateTodoPayload",
  types: () => [CreateTodoSuccess, InvalidTodoRejection] as const,
  resolveType: value => {
    if (value instanceof InvalidTodoRejection) {
      return InvalidTodoRejection
    }
    return CreateTodoSuccess
  },
})

@Resolver("Todo")
export class TodoResolver {
  constructor(
    @Inject(TodoMapper) private readonly todoMapper: TodoMapper,
    @Inject(ListTodosUseCase) private readonly listTodosUseCase: ListTodosUseCase,
    @Inject(CreateTodoUseCase) private readonly createTodoUseCase: CreateTodoUseCase,
  ) {}

  @Query(() => [TodoGQL])
  async getTodos(): Promise<TodoGQL[]> {
    const todos = await this.listTodosUseCase.execute()

    return todos.map(this.todoMapper.toGQLFromDomain)
  }

  @Mutation(() => CreateTodoPayload)
  async createTodo(@Args("title") title: string): Promise<typeof CreateTodoPayload> {
    const result = await this.createTodoUseCase.execute({ title })

    return result.fold(
      todoDomain => this.todoMapper.toGQLFromDomain(todoDomain),
      error => new InvalidTodoRejection(error),
    )
  }
}
