import { writeFileSync } from "node:fs";
import { printSchema, lexicographicSortSchema } from "graphql";
import { createSchema } from "../modules/todo/interface/http/graphql/schema.js";
import { AppLayer } from "../app.layer.js";

const schema = createSchema(AppLayer);
const schemaAsString = printSchema(lexicographicSortSchema(schema));

writeFileSync(
    "src/modules/todo/interface/http/graphql/todo.schema.graphql",
    schemaAsString,
);
