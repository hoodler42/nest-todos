import { beforeEach, describe, expect, it, vi } from "vitest"

import type { SpyOf } from "../../../../../../../tests/types.js"
import { TodoEntity } from "../../../domain/entities/todo.entity.js"
import type { TodoRepository } from "../../ports/repositories/todo.repository.js"
import { ListTodosUseCase } from "./list-todos.use-case.js"

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
      new TodoEntity({ id: "2", props: { title: "Do this", isCompleted: false } }),
      new TodoEntity({ id: "3", props: { title: "Do that", isCompleted: false } }),
    ]
    todoRepoFindAllSpy.mockResolvedValue(todosToRetrieve)

    const retrievedTodos = await useCase.execute()

    expect(todoRepoFindAllSpy).toHaveBeenCalled()
    expect(retrievedTodos).toEqual(todosToRetrieve)
  })
})
