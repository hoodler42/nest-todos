import { Before, Given, Then, When } from "@cucumber/cucumber"
import { expect } from "earl"
import { v4 as uuid } from "uuid"
import { TodoTypeOrm } from "../../../infrastructure/database/entities/todo.typeorm.js"
import type { TodoGraphql } from "../../../interface/http/graphql/entities/todo.graphql.js"
import type { E2EWorld } from "../../global.e2e.steps.js"

let existingTodos: TodoTypeOrm[]
let retrievedTodos: TodoGraphql[]

Before(async function (this: E2EWorld) {
  await this.dataSource.getRepository(TodoTypeOrm).delete({})
})

Given("there are existing todos", async function (this: E2EWorld) {
  existingTodos = [
    { id: uuid(), title: "Buy milk", isCompleted: false },
    { id: uuid(), title: "Buy eggs", isCompleted: false },
  ]
  await this.dataSource.getRepository(TodoTypeOrm).save(existingTodos)
})
When("the user requests to retrieve all todos", async function (this: E2EWorld) {
  const response = await this.gqlSdk.GetTodos()
  retrievedTodos = response.getTodos
})
Then("the user should receive a list of todos", function (this: E2EWorld) {
  expect(retrievedTodos).toEqual(existingTodos)
})
