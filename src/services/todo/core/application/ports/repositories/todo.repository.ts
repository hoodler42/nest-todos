import { RepositoryPort } from "../../../../../../lib/repository.port.js"
import type { TodoEntity } from "../../../domain/entities/todo.entity.js"

export abstract class TodoRepository extends RepositoryPort<TodoEntity> {}
