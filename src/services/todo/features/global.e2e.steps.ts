import { AfterAll, type IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber"
import { Test } from "@nestjs/testing"
import { DataSource } from "typeorm"
import { AppModule } from "../../../app.module.js"

const moduleFixture = await Test.createTestingModule({
  imports: [AppModule],
}).compile()
const app = moduleFixture.createNestApplication()
await app.init()

await app.listen(0)
const appUrl = await app.getUrl()

const postgresDataSource = moduleFixture.get<DataSource>(DataSource)

export class E2EWorld extends World {
  response!: Response
  data!: unknown
  dataSource!: DataSource
  appUrl!: string

  constructor(options: IWorldOptions) {
    super(options)

    this.dataSource = postgresDataSource
    this.appUrl = appUrl
  }
}
setWorldConstructor(E2EWorld)

AfterAll(async () => {
  await app.close()
})
