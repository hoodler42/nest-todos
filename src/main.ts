import type { ExceptionFilter } from "@nestjs/common/interfaces/exceptions/exception-filter.interface.js"
import type { NestApplicationOptions } from "@nestjs/common/interfaces/nest-application-options.interface.js"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module.js"
import type { EnvSchema } from "./env.validation.js"
import { ZodFilter } from "./zod.filter.js"

const app = await NestFactory.create(AppModule, {
  abortOnError: true,
} as NestApplicationOptions)

app.useGlobalFilters(new ZodFilter() as ExceptionFilter)

const configService = app.get(ConfigService<EnvSchema, true>)
const appPort = configService.get("APP_PORT")

await app.listen(appPort)
console.info(`Listening on http://localhost:${appPort}`)
