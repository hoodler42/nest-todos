import { Before, Given, Then, When } from "@cucumber/cucumber"
import { expect } from "earl"
import { v4 as uuid } from "uuid"
import type { Todo } from "../../../core/domain/entities/todo.js"
import type { IntegrationWorld } from "../../global.integration.steps.js"

let expectedTodos: Todo[]
let todosList: Todo[]

Before(async function (this: IntegrationWorld) {
  await this.typeormRepos.todo.delete({})
  expectedTodos = []
})

Given("there are existing todos", async function (this: IntegrationWorld) {
  const existingTodos = [
    { id: uuid(), title: "Buy milk", isCompleted: false },
    { id: uuid(), title: "Buy eggs", isCompleted: false },
  ]
  await this.typeormRepos.todo.save(existingTodos)
  expectedTodos = existingTodos.map(this.mappers.todo.toDomainFromOrm)
})
When("the user requests to retrieve all todos", async function (this: IntegrationWorld) {
  todosList = await this.useCases.listTodos.execute()
})
Then("the user should receive a list of todos", function () {
  expect(todosList).toEqual(expectedTodos)
})
