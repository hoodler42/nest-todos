import { Inject } from "@nestjs/common";
import { Result } from "typescript-result";

import { TodoEntity } from "../../domain/entities/todo.entity.js";
import type { InvalidTodoError } from "../../domain/errors/invalid-todo.error.js";
import { ID_GENERATOR_TOKEN, type IdGenerator } from "../ports/id-generator/id-generator.js";
import {
    type TodoRepository,
    TODO_REPOSITORY_TOKEN,
} from "../ports/repositories/todo.repository.js";

export interface CreateTodoUseCasePort {
    title: string;
}

export class CreateTodoUseCase {
    constructor(
        @Inject(ID_GENERATOR_TOKEN) private readonly idGenerator: IdGenerator,
        @Inject(TODO_REPOSITORY_TOKEN) private readonly todoRepository: TodoRepository,
    ) {}

    async execute({ title }: CreateTodoUseCasePort): Promise<Result<TodoEntity, InvalidTodoError>> {
        const id = this.idGenerator.generate();

        const result = TodoEntity.create({ id, title });

        return result.fold(
            async createdTodo => {
                const result = await this.todoRepository.insertOne(createdTodo);
                return result.map(
                    () => createdTodo,
                );
            },
            error => Result.error(error),
        );
    }
}
