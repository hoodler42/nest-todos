import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CamelCasePlugin, PostgresDialect } from "kysely";
import { KyselyModule } from "nestjs-kysely";
import { Pool } from "pg";

// const ormEntities = [TodoModel]

@Module({
  // exports: [TypeOrmModule],
  imports: [
    KyselyModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // @ts-ignore ???
      useFactory: async (configService: ConfigService) => ({
        dialect: new PostgresDialect({
          pool: new Pool(configService.get("DATABASE_URL")),
        }),
        plugins: [new CamelCasePlugin()],
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     database: configService.get("DATABASE_NAME"),
    //     entities: ormEntities,
    //     host: configService.get("DATABASE_URL"),
    //     migrations: ["dist/**/migrations/*.js"],
    //     migrationsTableName: "migrations",
    //     password: configService.get("DATABASE_PASSWORD"),
    //     port: configService.get("DATABASE_PORT"),
    //     retryAttempts: 0,
    //     retryDelay: 0,
    //     type: "postgres",
    //     username: configService.get("DATABASE_USER"),
    //   }),
    // }),
    // TypeOrmModule.forFeature(ormEntities),
  ],
})
export class TodoDatabaseModule {}
