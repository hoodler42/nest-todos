import { Before, Then, When } from "@cucumber/cucumber"
import { expect } from "earl"
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo/create-todo.use-case.js"
import type { Todo } from "../../../core/domain/entities/todo.js"
import { UUIDGenerator } from "../../../infrastructure/adapters/id-generator/uuid-generator.js"
import { TodoRepositoryInMemory } from "../../../infrastructure/adapters/repositories/in-memory/todo.repository.in-memory.js"

let useCase: CreateTodoUseCase
let todoCreated: Todo

Before(function () {
  const idGenerator = UUIDGenerator
  const todoRepository = new TodoRepositoryInMemory()
  useCase = new CreateTodoUseCase(idGenerator, todoRepository)
})
When("the user asks to create a new todo named {string}", async function (title: string) {
  todoCreated = await useCase.execute(title)
})
Then("a new todo with the title {string} should be created", async function (title: string) {
  expect(todoCreated).toEqual(expect.subset({ id: expect.a(String), title, isCompleted: false }))
})
