import { AfterAll, type IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber"
import { Test } from "@nestjs/testing"
import { DataSource, type Repository } from "typeorm"
import { AppModule } from "../../../app.module.js"
import { CreateTodoUseCase } from "../core/application/use-cases/create-todo/create-todo.use-case.js"
import { ListTodosUseCase } from "../core/application/use-cases/list-todos/list-todos.use-case.js"
import { TodoTypeOrm } from "../infrastructure/database/entities/todo.typeorm.js"
import { TodoMapper } from "../mapper/todo.mapper.js"

const moduleFixture = await Test.createTestingModule({
  imports: [AppModule],
}).compile()
const app = moduleFixture.createNestApplication()
await app.init()

const postgresDataSource = moduleFixture.get<DataSource>(DataSource)

export class IntegrationWorld extends World {
  useCases: {
    createTodo: CreateTodoUseCase
    listTodos: ListTodosUseCase
  }
  typeormRepos: {
    todo: Repository<TodoTypeOrm>
  }
  mappers: {
    todo: TodoMapper
  }

  constructor(options: IWorldOptions) {
    super(options)

    this.useCases = {
      listTodos: app.get(ListTodosUseCase),
      createTodo: app.get(CreateTodoUseCase),
    }
    this.typeormRepos = {
      todo: postgresDataSource.getRepository(TodoTypeOrm),
    }
    this.mappers = {
      todo: app.get(TodoMapper),
    }
  }
}
setWorldConstructor(IntegrationWorld)

AfterAll(async () => {
  await app.close()
})
