import { Module, type Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CamelCasePlugin, PostgresDialect } from "kysely";
import { KyselyModule } from "nestjs-kysely";
import { Pool } from "pg";

import {
    TODO_REPOSITORY_TOKEN,
} from "../../core/application/ports/repositories/todo.repository.js";
import { TodoRepositoryKysely } from "./kysely/repositories/todo.repository.kysely.js";

const repositories: Provider[] = [
    {
        provide: TODO_REPOSITORY_TOKEN,
        useClass: TodoRepositoryKysely,
    },
];

@Module({
    exports: repositories,
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
    providers: repositories,
})
export class TodoPersistenceModule {}
