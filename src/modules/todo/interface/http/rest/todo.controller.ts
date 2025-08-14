import { Body, Controller, Get, HttpCode, Inject, Post } from "@nestjs/common";
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo.use-case.js";
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos.use-case.js";
import { todoMapper } from "../../../todo.mapper.js";
import { type CreateTodoDto } from "./dto/input/create-todo.dto.js";
import type { TodoRestDTO } from "./dto/output/todo.rest.dto.js";

@Controller("todos")
export class TodoController {
  constructor(
    @Inject(ListTodosUseCase) private readonly listTodosUseCase: ListTodosUseCase,
    @Inject(CreateTodoUseCase) private readonly createTodoUseCase: CreateTodoUseCase,
  ) {}

  @Get()
  async listTodos(): Promise<TodoRestDTO[]> {
    const todos = await this.listTodosUseCase.execute();

    return todos.map(todoMapper.toRestDTOFromDomain);
  }

  @Post()
  @HttpCode(201)
  async createTodo(@Body() body: CreateTodoDto): Promise<TodoRestDTO> {
    const result = await this.createTodoUseCase.execute({ title: body.title });
    return result.fold(
      todDomain => todoMapper.toRestDTOFromDomain(todDomain),
      error => Promise.reject(error.message),
    );
  }
}
