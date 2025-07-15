import { Module } from "@nestjs/common";
import { TodoInfrastructureModule } from "./infrastructure/todo.infrastructure.module.js";
import { TodoInterfaceModule } from "./interface/todo.interface.module.js";

@Module({
  imports: [TodoInterfaceModule, TodoInfrastructureModule],
})
export class TodoModule {}
