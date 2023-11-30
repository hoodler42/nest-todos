import { Module } from "@nestjs/common"
import { TodoRestModule } from "./rest/todo.rest.module.js"

@Module({
  imports: [TodoRestModule],
})
export class TodoHttpModule {}
