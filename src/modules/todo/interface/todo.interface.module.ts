import { Module } from "@nestjs/common";
import { TodoHttpModule } from "./http/todo.http.module.js";

@Module({
    imports: [TodoHttpModule],
})
export class TodoInterfaceModule {}
