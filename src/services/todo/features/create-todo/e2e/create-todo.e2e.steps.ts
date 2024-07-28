import { Before, Then, When } from "@cucumber/cucumber"
import { expect } from "earl"
import { TodoTypeOrm } from "../../../infrastructure/database/entities/todo.typeorm.js"
import { type CreateTodoMutation } from "../../../interface/http/graphql/client-request/sdk.js"
import type { E2EWorld } from "../../global.e2e.steps.js"

let createdTodo: CreateTodoMutation["createTodo"]

Before(async function (this: E2EWorld) {
  await this.dataSource.getRepository(TodoTypeOrm).delete({})
})
When(
  "the user asks to create a new todo named {string}",
  async function (this: E2EWorld, title: string) {
    const response = await this.gqlSdk.CreateTodo({
      title,
    })
    createdTodo = response.createTodo
  },
)
Then("a new todo with the title {string} should be created", async function (title: string) {
  expect(createdTodo).toEqual({ id: expect.a(String), title, isCompleted: false })
})
