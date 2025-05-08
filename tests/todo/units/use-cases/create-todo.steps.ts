import { describe } from "vitest"

describe("Feature: Create Todo", () => {
  console.info("Feature: Create Todo")
  describe("Scenario: Create a Todo", () => {
    console.info("Scenario: Create a Todo")
  })
  describe("Scenario: Create a Todo without due date", () => {
  })
  describe("Scenario: Create a Todo without title", () => {
  })
})

function givenThingToDo(thingToDo: string) {
}

// const feature = await loadFeature("tests/todo/create-todo.feature")
//
// describeFeature(feature, ({ Scenario }) => {
//   const idGenerator: IdGenerator = UUIDGenerator
//   const todoRepository = {
//     insertOne: vi.fn(),
//   } as Partial<TodoRepository> as TodoRepository
//   const useCase = new CreateTodoUseCase(idGenerator, todoRepository)
//
//   Scenario("Create a Todo", ({ Given, When, Then }) => {
//     const todoToCreate: { title?: string } = {}
//     const result: { todoCreated?: TodoEntity } = {}
//
//     Given("a task {string}", (_: TaskContext, title: string) => {
//       todoToCreate.title = title
//     })
//     When("User asks to create the Todo", async (ctx: TaskContext) => {
//       const title = getOrThrow(todoToCreate, "title", ctx.skip)
//       result.todoCreated = await useCase.execute(title)
//     })
//     Then("the Todo is created", (ctx: TaskContext) => {
//       const todoCreated = getOrThrow(result, "todoCreated", ctx.skip)
//       expect(todoCreated.title).toBe(todoToCreate.title)
//     })
//   })
// })
//
// function getOrThrow<T>(
//   obj: Record<string, T>,
//   propertyName: string,
//   skip: () => void,
// ): T | undefined {
//   if (!obj[propertyName]) {
//     console.error(new Error(`Property ${propertyName} is missing`))
//     skip()
//   }
//
//   return obj[propertyName]
// }
