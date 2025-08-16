import type {
    InsertQueryBuilder,
    InsertResult,
    Kysely,
    SelectQueryBuilder,
    NoResultError,
} from "kysely";
import { InjectKysely } from "nestjs-kysely";

import type {
    TodoRepository,
} from "../../../../core/application/ports/repositories/todo.repository.js";
import type { TodoEntity } from "../../../../core/domain/entities/todo.entity.js";
import { todoMapper } from "../../../../todo.mapper.js";
import type { DB } from "./models.js";
import { Result } from "typescript-result";

export class TodoRepositoryKysely
    implements TodoRepository {
    private readonly selectTodoDB: SelectQueryBuilder<DB, "todo", unknown>;
    private readonly insertTodoDB: InsertQueryBuilder<DB, "todo", InsertResult>;

    constructor(@InjectKysely() db: Kysely<DB>) {
        this.selectTodoDB = db.selectFrom("todo");
        this.insertTodoDB = db.insertInto("todo");
    }

    public async insertOne(todoDomain: TodoEntity): Promise<Result<void, NoResultError>> {
        const todoModel = todoMapper.toModelFromDomain(todoDomain);

        await this.insertTodoDB.values(todoModel).executeTakeFirstOrThrow().catch(Result.error);

        return Result.ok();
    }

    public async findAll(): Promise<TodoEntity[]> {
        const todoModels = await this.selectTodoDB.selectAll().execute();

        return todoModels.map(todoMapper.toDomainFromModel);
    }
}
