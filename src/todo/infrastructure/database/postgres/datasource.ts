import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { DataSource } from "typeorm"
import { validateConfig } from "../../../../env.validation.js"
import { TodoDatabaseModule } from "../todo.database.module.js"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validate: validateConfig,
    }),
    TodoDatabaseModule,
  ],
})
class PostgresModule {}

const app = await NestFactory.create(PostgresModule, { logger: ["fatal", "error"] })
const PostgresDataSource = app.get(DataSource)

export default PostgresDataSource
