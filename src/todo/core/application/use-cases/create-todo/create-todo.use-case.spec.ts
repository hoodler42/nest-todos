import { beforeEach, describe, expect, it, type MockInstance, vi } from "vitest"
import type { IdGenerator } from "../../ports/id-generator/id-generator.js"
import type { TodoRepository } from "../../ports/repositories/todo.repository.js"
import { CreateTodoUseCase } from "./create-todo.use-case.js"

type SpyOf<Fn extends (...args: any[]) => any> = MockInstance<Parameters<Fn>, ReturnType<Fn>>

describe("CreateTodoUseCase", () => {
  let useCase: CreateTodoUseCase
  let idGeneratorSpy: SpyOf<IdGenerator>
  let todoRepoInsertSpy: SpyOf<TodoRepository["insert"]>

  beforeEach(async () => {
    vi.resetAllMocks()

    const idGenerator = vi.fn()
    const todoRepository: Partial<TodoRepository> = {
      insert: vi.fn(),
    }

    useCase = new CreateTodoUseCase(idGenerator as IdGenerator, todoRepository as TodoRepository)

    todoRepoInsertSpy = vi.spyOn(todoRepository, "insert")
    idGeneratorSpy = idGenerator
  })

  it("Should create a todo", async () => {
    const todoToCreate = { id: "2", title: "Do this", isCompleted: false }
    idGeneratorSpy.mockReturnValueOnce(todoToCreate.id)

    await useCase.execute(todoToCreate.title)

    expect(idGeneratorSpy).toHaveBeenCalled()
    expect(todoRepoInsertSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        id: todoToCreate.id,
        props: {
          title: todoToCreate.title,
          isCompleted: todoToCreate.isCompleted,
        },
      }),
    )
  })
})
