import { Layer } from "effect";

import { TodoRepositoryKysely } from "./kysely/repositories/todo.repository.kysely.js";
import { KyselyConnectionService } from "./kysely/kysely.service.js";

export const TodoPersistenceLayer = Layer.provide(
    TodoRepositoryKysely,
    KyselyConnectionService,
);
