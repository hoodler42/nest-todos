import { Module } from "@nestjs/common"
import { TodoInfrastructureModule } from "../../infrastructure/todo.infrastructure.module.js"
import { CreateTodoUseCase } from "./use-cases/create-todo/create-todo.use-case.js"
import { ListTodosUseCase } from "./use-cases/list-todos/list-todos.use-case.js"

const useCases = [ListTodosUseCase, CreateTodoUseCase]

@Module({
  providers: [...useCases],
  imports: [TodoInfrastructureModule],
  exports: [...useCases],
})
export class TodoApplicationModule {}
