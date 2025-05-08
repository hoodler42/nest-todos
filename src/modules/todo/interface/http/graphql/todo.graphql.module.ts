import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TodoApplicationModule } from "../../../core/application/todo.application.module.js"
import { TodoMapperModule } from "../../../mapper/todo.mapper.module.js"
import { TodoResolver } from "./todo.resolver.js"

@Module({
  providers: [TodoResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TodoMapperModule,
    TodoApplicationModule,
  ],
})
export class TodoGraphqlModule {
}
