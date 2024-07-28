import { AfterAll, type IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber"
import { Test } from "@nestjs/testing"
import { GraphQLClient } from "graphql-request"
import { DataSource } from "typeorm"
import { AppModule } from "../../../app.module.js"
import { getSdk } from "../interface/http/graphql/client-request/sdk.js"

const moduleFixture = await Test.createTestingModule({
  imports: [AppModule],
}).compile()
const app = moduleFixture.createNestApplication()
await app.init()

await app.listen(0)
const appUrl = await app.getUrl()
const client = new GraphQLClient(`${appUrl}/graphql`)

const postgresDataSource = moduleFixture.get<DataSource>(DataSource)

export class E2EWorld extends World {
  dataSource: DataSource
  gqlSdk: ReturnType<typeof getSdk>

  constructor(options: IWorldOptions) {
    super(options)

    this.dataSource = postgresDataSource
    this.gqlSdk = getSdk(client)
  }
}
setWorldConstructor(E2EWorld)

AfterAll(async () => {
  await app.close()
})
