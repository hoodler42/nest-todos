import { ConsoleLogger, type LoggerService, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { DataSource } from "typeorm"
import { validateConfig } from "../../../../../env.validation.js"
import { TodoDatabaseModule } from "../todo.database.module.js"

export class DataSourceLogger extends ConsoleLogger implements LoggerService {
  override error(message: string, stack?: string, context?: string) {
    if (context === "ExceptionHandler") {
      return
    }

    super.error(message, stack, context)
  }
}

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

const dataSourceLogger = new DataSourceLogger()
dataSourceLogger.setLogLevels(["error", "fatal"])
const app = await NestFactory.createApplicationContext(PostgresModule, { logger: dataSourceLogger })

const PostgresDataSource = app.get(DataSource)

export default PostgresDataSource
