import { Module } from "@nestjs/common";

import { TodoPersistenceModule } from "./persistence/todo.persistence.module.js";
import { TodoIdGeneratorModule } from "./id-generator/todo.id-generator.module.js";

@Module({
    imports: [TodoPersistenceModule, TodoIdGeneratorModule],
    exports: [TodoPersistenceModule, TodoIdGeneratorModule],
})
export class TodoInfrastructureModule {}
