import { describe } from "vitest";
import type { CreateTodoUseCasePort } from "../../application/use-cases/create-todo.use-case.js";

export function givenValidTitle(cb: (validTitle: CreateTodoUseCasePort["title"]) => void) {
  describe("Given the title is valid", () => {
    const validTitle = "Valid Todo Title"

    return cb(validTitle)
  })
}

export function givenInvalidTitle(cb: (invalidTitle: CreateTodoUseCasePort["title"], errorReason: string) => void) {
  describe("Given the title is invalid", () => {
    describe.each([
      ["is not long enough", "Hello", "Title must be at least 6 characters long"],
      ["is too long", String("a".repeat(101)), "Title must be at most 100 characters long"],
      [`contains the word "Error"`, "This is an Error", "Title cannot contain the word 'Error'"],
    ])("Given the title %s", (_: string, invalidTitle: CreateTodoUseCasePort["title"], errorReason: string) =>
      cb(invalidTitle, errorReason),
    )
  })
}
