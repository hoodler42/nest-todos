import { Module, type Provider } from "@nestjs/common";
import { ID_GENERATOR_TOKEN } from "../core/application/ports/id-generator/id-generator.js";
import { TodoRepository } from "../core/application/ports/repositories/todo.repository.js";
import { UUIDGenerator } from "./adapters/id-generator/uuid-generator.js";
import { TodoRepositoryKysely } from "./adapters/repositories/kysely/todo.repository.kysely.js";
import { TodoDatabaseModule } from "./database/todo.database.module.js";

const repositories: Provider[] = [{ provide: TodoRepository, useClass: TodoRepositoryKysely }];
const idGenerators: Provider[] = [{ provide: ID_GENERATOR_TOKEN, useClass: UUIDGenerator }];
const adapters = [...repositories, ...idGenerators];

@Module({
  exports: [...adapters],
  imports: [TodoDatabaseModule],
  providers: [...adapters],
})
export class TodoInfrastructureModule {}
