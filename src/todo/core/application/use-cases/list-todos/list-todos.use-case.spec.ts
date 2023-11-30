import { type MockInstance, beforeEach, describe, expect, it, vi } from "vitest"
import { Todo } from "../../../domain/entities/todo.js"
import type { TodoRepository } from "../../ports/repositories/todo.repository.js"
import { ListTodosUseCase } from "./list-todos.use-case.js"

type SpyOf<Fn extends () => void> = MockInstance<Parameters<Fn>, ReturnType<Fn>>

describe("ListTodosUseCase", () => {
  let useCase: ListTodosUseCase
  let todoRepoFindAllSpy: SpyOf<TodoRepository["findAll"]>

  beforeEach(async () => {
    vi.resetAllMocks()

    const todoRepository: Partial<TodoRepository> = {
      findAll: vi.fn(),
    }

    useCase = new ListTodosUseCase(todoRepository as TodoRepository)

    todoRepoFindAllSpy = vi.spyOn(todoRepository, "findAll")
  })

  it("Should get a todo", async () => {
    const todosToRetrieve = [
      new Todo({ id: "2", props: { title: "Do this", isCompleted: false } }),
      new Todo({ id: "3", props: { title: "Do that", isCompleted: false } }),
    ]
    todoRepoFindAllSpy.mockResolvedValue(todosToRetrieve)

    await useCase.execute()

    expect(todoRepoFindAllSpy).toHaveBeenCalled()
  })
})
