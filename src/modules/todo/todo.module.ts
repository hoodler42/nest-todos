import { Module } from "@nestjs/common";

import { TodoInterfaceModule } from "./interface/todo.interface.module.js";

@Module({
    imports: [TodoInterfaceModule],
})
export class TodoModule {}
