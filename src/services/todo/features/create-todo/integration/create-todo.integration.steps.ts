import { Before, Then, When } from "@cucumber/cucumber"
import { expect } from "earl"
import { IntegrationWorld } from "../../global.integration.steps.js"

Before(async function (this: IntegrationWorld) {
  await this.typeormRepos.todo.delete({})
})

When(
  "the user asks to create a new todo named {string}",
  async function (this: IntegrationWorld, title: string) {
    await this.useCases.createTodo.execute(title)
  },
)
Then(
  "a new todo with the title {string} should be created",
  async function (this: IntegrationWorld, title: string) {
    const savedTodos = await this.typeormRepos.todo.find()
    expect(savedTodos).toHaveLength(1)
    expect(savedTodos[0]?.title).toEqual(title)
  },
)
