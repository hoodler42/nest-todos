import { Before, Then, When } from "@cucumber/cucumber"
import { expect } from "earl"
import { TodoTypeOrm } from "../../../infrastructure/database/entities/todo.typeorm.js"
import type { E2EWorld } from "../../global.e2e.steps.js"

Before(async function (this: E2EWorld) {
  await this.dataSource.getRepository(TodoTypeOrm).delete({})
})
When(
  "the user asks to create a new todo named {string}",
  async function (this: E2EWorld, title: string) {
    this.response = await fetch(`${this.appUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
    this.data = await this.response.json()
  },
)
Then(
  "a new todo with the title {string} should be created",
  async function (this: E2EWorld, title: string) {
    expect(this.response.status).toEqual(201)
    expect(this.data).toEqual({ id: expect.a(String), title, isCompleted: false })
  },
)
