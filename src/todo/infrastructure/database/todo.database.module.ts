import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TodoTypeOrm } from "./entities/todo.typeorm.js"

const ormEntities = [TodoTypeOrm]

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DATABASE_URL"),
        port: configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        database: configService.get("DATABASE_NAME"),
        entities: ormEntities,
        migrations: ["dist/**/migrations/*.js"],
        migrationsTableName: "migrations",
        retryAttempts: 0,
        retryDelay: 0,
      }),
    }),
    TypeOrmModule.forFeature(ormEntities),
  ],
  exports: [TypeOrmModule],
})
export class TodoDatabaseModule {}
