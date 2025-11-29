import { Module } from "@nestjs/common";
import { TodoGraphqlModule } from "./graphql/todo.graphql.module.js";
import { TodoRestModule } from "./rest/todo.rest.module.js";

@Module({
    imports: [TodoRestModule, TodoGraphqlModule],
})
export class TodoHttpModule {}
