import { Inject } from "@nestjs/common";
import { Args, createUnionType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo.use-case.js";
import { ListTodosUseCase } from "../../../core/application/use-cases/list-todos.use-case.js";
import { todoMapper } from "../../../todo.mapper.js";
import { TodoGqlDTO } from "./dto/todo.graphql.dto.js";
import { CreateTodoSuccess } from "./payloads/create-todo-success.payload.js";
import { InvalidTodoRejection } from "./rejections/invalid-todo.rejection.js";

const CreateTodoPayload = createUnionType({
    name: "CreateTodoPayload",
    types: () => [CreateTodoSuccess, InvalidTodoRejection] as const,
    resolveType: value => {
        if (value instanceof InvalidTodoRejection) {
            return InvalidTodoRejection;
        }
        return CreateTodoSuccess;
    },
});

@Resolver("Todo")
export class TodoResolver {
    constructor(
        @Inject(ListTodosUseCase) private readonly listTodosUseCase: ListTodosUseCase,
        @Inject(CreateTodoUseCase) private readonly createTodoUseCase: CreateTodoUseCase,
    ) {}

    @Query(() => [TodoGqlDTO])
    async listTodos(): Promise<TodoGqlDTO[]> {
        const todos = await this.listTodosUseCase.execute();

        return todos.map(todoMapper.toGqlDTOFromDomain);
    }

    @Mutation(() => CreateTodoPayload)
    async createTodo(@Args("title") title: string): Promise<typeof CreateTodoPayload> {
        const result = await this.createTodoUseCase.execute({ title });

        return result.fold(
            todoDomain => todoMapper.toGqlDTOFromDomain(todoDomain),
            error => new InvalidTodoRejection(error),
        );
    }
}
