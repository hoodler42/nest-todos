import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  CamelCasePlugin,
  Kysely,
  type Migration,
  type MigrationProvider,
  Migrator,
  sql,
} from "kysely";
import { KyselyPGlite } from "kysely-pglite";
import type {
  DB,
} from "../../src/modules/todo/infrastructure/adapters/repositories/kysely/models.js";

function splitSqlCommand(sqlCommand: string): string[] {
  return sqlCommand
    .split(/;\s*(?![^()]*\))/)
    .map(command => command.trim())
    .filter(command => command);
}

class PrismaMigrationProvider implements MigrationProvider {
  constructor(private readonly migrationFolder: string) {}

  async getMigrations(): Promise<Record<string, Migration>> {
    const entries = readdirSync(this.migrationFolder, { withFileTypes: true });
    const directories = entries.filter(e => e.isDirectory());

    return directories.reduce(
      (migrations, directory) => {
        const dirPath = path.join(this.migrationFolder, directory.name);
        const dirEntries = readdirSync(dirPath, { withFileTypes: true });
        const sqlFiles = dirEntries
          .filter(f => f.isFile() && f.name.toLowerCase().endsWith(".sql"))
          .map(f => f.name)
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
        const contents = sqlFiles.map(sqlFile => readFileSync(path.join(dirPath, sqlFile), "utf8"));
        const bigSql = contents.join("\n");
        const sqlCommands = splitSqlCommand(bigSql).map(command => sql.raw(command));

        migrations[directory.name] = {
          async up(db) {
            await Promise.all(sqlCommands.map(command => command.execute(db)));
          },
        };

        return migrations;
      },
      {} as Record<string, Migration>,
    );
  }
}

export async function prepareKyselyPGLiteTestDatabase(): Promise<Kysely<DB>> {
  const { dialect } = await KyselyPGlite.create();

  const testDataBase = new Kysely<DB>({
    dialect,
    plugins: [new CamelCasePlugin()],
  });

  const migrationFolder = path.join(__dirname, "../../src/modules/todo/infrastructure/database/prisma/migrations");
  const migrator = new Migrator({
    db: testDataBase,
    provider: new PrismaMigrationProvider(migrationFolder),
  });

  const { error } = await migrator.migrateToLatest();

  if (error) {
    console.error("Failed to migrate", error);
    process.exit(1);
  }

  return testDataBase;
}
