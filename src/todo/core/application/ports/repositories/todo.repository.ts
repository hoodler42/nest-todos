import { RepositoryPort } from "../../../../../lib/repository.port.js"
import type { Todo, TodoProps } from "../../../domain/entities/todo.js"

export abstract class TodoRepository extends RepositoryPort<Todo, TodoProps> {}
