import fs from "node:fs"
import path from "node:path"
import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from "@nestjs/graphql"
import { lexicographicSortSchema, printSchema } from "graphql/utilities/index.js"
import { TodoResolver } from "../services/todo/interface/http/graphql/todo.resolver.js"

const app = await NestFactory.createApplicationContext(GraphQLSchemaBuilderModule, {
  logger: false,
})
await app.init()

const logger = new Logger("SDLBuilder")
app.useLogger(logger)

const gqlSchemaFactory = app.get(GraphQLSchemaFactory)

// biome-ignore lint/complexity/noBannedTypes: I don't know what a resolver type is.
const resolversByService: { [key: string]: Function[] } = {
  todo: [TodoResolver],
}

logger.log("Generating SDLs...")
for (const [serviceName, resolvers] of Object.entries(resolversByService)) {
  logger.log(`Generating SDL for "${serviceName}" service`)

  const schema = await gqlSchemaFactory.create(resolvers)
  fs.writeFileSync(
    path.join(
      process.cwd(),
      `src/services/${serviceName}/interface/http/graphql/${serviceName}.schema.graphql`,
    ),
    printSchema(lexicographicSortSchema(schema)),
  )

  logger.log(`SDL generated for "${serviceName}" service`)
}
logger.log("SDLs successfully generated")

await app.close()
