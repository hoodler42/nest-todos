import fs from "node:fs"
import path from "node:path"
import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql"
import { lexicographicSortSchema, printSchema } from "graphql/utilities/index.js"
import { TodoResolver } from "../services/todo/interface/http/graphql/todo.resolver.js"

const app = await NestFactory.create(GraphQLSchemaBuilderModule)
await app.init()

const gqlSchemaFactory = app.get(GraphQLSchemaFactory)

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const services: { [key: string]: Function[] } = {
  todo: [TodoResolver],
}

const logger = new Logger("SDLBuilder")
logger.log("Generating SDLs...")
for (const [serviceName, resolvers] of Object.entries(services)) {
  logger.log(`Generating SDL for "${serviceName}" service`)

  const schema = await gqlSchemaFactory.create(resolvers)
  fs.writeFileSync(
    path.join(process.cwd(), `src/services/${serviceName}/public/schema-${serviceName}.gql`),
    printSchema(lexicographicSortSchema(schema)),
  )

  logger.log(`SDL generated for "${serviceName}" service`)
}

logger.log("Closing Nest application...")
await app.close()
logger.log("Nest application successfully closed")
