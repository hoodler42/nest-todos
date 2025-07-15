import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validateConfig } from "./env.validation.js";
import { TodoModule } from "./modules/todo/todo.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate: validateConfig,
    }),
    TodoModule,
  ],
})
export class AppModule {}
