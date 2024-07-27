import { Before, Given, Then, When } from "@cucumber/cucumber"
import { expect } from "earl"
import type { TodoRepository } from "../../../core/application/ports/repositories/todo.repository.js"
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos/list-todos.use-case.js"
import { Todo } from "../../../core/domain/entities/todo.js"
import { UUIDGenerator } from "../../../infrastructure/adapters/id-generator/uuid-generator.js"
import { TodoRepositoryInMemory } from "../../../infrastructure/adapters/repositories/in-memory/todo.repository.in-memory.js"

let todoRepository: TodoRepository
let useCase: ListTodosUseCase
let expectedTodoList: Todo[]
let todoList: Todo[]

Before(function () {
  todoRepository = new TodoRepositoryInMemory()
  useCase = new ListTodosUseCase(todoRepository)
})
Given("there are existing todos", async function () {
  const idGenerator = UUIDGenerator
  expectedTodoList = [
    new Todo({ id: idGenerator(), props: { title: "Buy milk", isCompleted: false } }),
    new Todo({ id: idGenerator(), props: { title: "Buy eggs", isCompleted: false } }),
  ]
  await todoRepository.insertMany(expectedTodoList)
})
When("the user requests to retrieve all todos", async function () {
  todoList = await useCase.execute()
})
Then("the user should receive a list of todos", async function () {
  expect(todoList).toEqual(expectedTodoList)
})
