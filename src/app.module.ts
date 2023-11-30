import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { validateConfig } from "./env.validation.js"
import { TodoInfrastructureModule } from "./todo/infrastructure/todo.infrastructure.module.js"
import { TodoInterfaceModule } from "./todo/interface/todo.interface.module.js"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate: validateConfig,
    }),
    TodoInterfaceModule,
    TodoInfrastructureModule,
  ],
})
export class AppModule {}
