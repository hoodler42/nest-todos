import { Body, Controller, Get, HttpCode, Inject, Post } from "@nestjs/common"
import { ZodPipe } from "../../../../zod.pipe.js"
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo/create-todo.use-case.js"
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos/list-todos.use-case.js"
import { TodoMapper } from "../../../mapper/todo.mapper.js"
import { type CreateTodoDto, CreateTodoDtoSchema } from "./dto/input/create-todo.dto.js"
import type { TodoDto } from "./dto/output/todo.dto.js"

@Controller("todos")
export class TodoController {
  constructor(
    @Inject(TodoMapper) private readonly todoMapper: TodoMapper,
    @Inject(ListTodosUseCase) private readonly listTodosUseCase: ListTodosUseCase,
    @Inject(CreateTodoUseCase) private readonly createTodoUseCase: CreateTodoUseCase,
  ) {}

  @Get()
  async listTodos(): Promise<TodoDto[]> {
    const todos = await this.listTodosUseCase.execute()

    return todos.map(this.todoMapper.toDTOFromDomain)
  }

  @Post()
  @HttpCode(201)
  async createTodo(@Body(new ZodPipe(CreateTodoDtoSchema)) body: CreateTodoDto): Promise<TodoDto> {
    const todoDomain = await this.createTodoUseCase.execute(body.title)
    return this.todoMapper.toDTOFromDomain(todoDomain)
  }
}
