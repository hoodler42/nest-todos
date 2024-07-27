import type { ExceptionFilter } from "@nestjs/common/interfaces/exceptions/exception-filter.interface.js"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import type { NestExpressApplication } from "@nestjs/platform-express/interfaces/nest-express-application.interface.js"
import { AppModule } from "./app.module.js"
import type { EnvSchema } from "./env.validation.js"
import { ZodFilter } from "./zod.filter.js"

const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  abortOnError: true,
})

app.useGlobalFilters(new ZodFilter() as ExceptionFilter)

const configService = app.get(ConfigService<EnvSchema, true>)
const appPort = configService.get("APP_PORT")

await app.listen(appPort)
console.info(`Listening on http://localhost:${appPort}`)
