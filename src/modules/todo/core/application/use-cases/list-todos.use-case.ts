import { Inject } from "@nestjs/common";

import type { TodoEntity } from "../../domain/entities/todo.entity.js";
import { TodoRepository, TODO_REPOSITORY_TOKEN } from "../ports/repositories/todo.repository.js";

export class ListTodosUseCase {
    constructor(@Inject(TODO_REPOSITORY_TOKEN) private readonly todoRepository: TodoRepository) {}

    async execute(): Promise<TodoEntity[]> {
        return this.todoRepository.findAll();
    }
}
