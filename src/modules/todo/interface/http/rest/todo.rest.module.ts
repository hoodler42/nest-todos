import { Module } from "@nestjs/common"
import { TodoApplicationModule } from "../../../core/application/todo.application.module.js"
import { TodoMapperModule } from "../../../mapper/todo.mapper.module.js"
import { TodoController } from "./todo.controller.js"

@Module({
  controllers: [TodoController],
  imports: [TodoMapperModule, TodoApplicationModule],
})
export class TodoRestModule {
}
