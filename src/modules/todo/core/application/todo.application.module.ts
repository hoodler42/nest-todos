import { Module } from "@nestjs/common";
import { TodoInfrastructureModule } from "../../infrastructure/todo.infrastructure.module.js";
import { CreateTodoUseCase } from "./use-cases/create-todo.use-case.js";
import { ListTodosUseCase } from "./use-cases/list-todos/list-todos.use-case.js";

const useCases = [ListTodosUseCase, CreateTodoUseCase]

@Module({
  exports: [...useCases],
  imports: [TodoInfrastructureModule],
  providers: [...useCases],
})
export class TodoApplicationModule {}
