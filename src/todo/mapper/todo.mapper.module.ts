import { Module } from "@nestjs/common"
import { TodoMapper } from "./todo.mapper.js"

@Module({
  providers: [TodoMapper],
  exports: [TodoMapper],
})
export class TodoMapperModule {}
