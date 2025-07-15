import { Module } from "@nestjs/common";
import { TodoMapper } from "./todo.mapper.js";

@Module({
  exports: [TodoMapper],
  providers: [TodoMapper],
})
export class TodoMapperModule {}
