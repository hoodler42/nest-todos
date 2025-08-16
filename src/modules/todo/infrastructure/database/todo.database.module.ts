import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CamelCasePlugin, PostgresDialect } from "kysely";
import { KyselyModule } from "nestjs-kysely";
import { Pool } from "pg";

@Module({
    imports: [
        KyselyModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            // @ts-ignore
            useFactory: async (configService: ConfigService) => (
                {
                    dialect: new PostgresDialect({
                        pool: new Pool(
                            {
                                host: configService.get("DATABASE_HOST"),
                                port: configService.get("DATABASE_PORT"),
                                database: configService.get("DATABASE_NAME"),
                                user: configService.get("DATABASE_USER"),
                                password: configService.get("DATABASE_PASSWORD"),
                            },
                        ),
                    }),
                    plugins: [new CamelCasePlugin()],
                }
            ),
        }),
    ],
})
export class TodoDatabaseModule {}
