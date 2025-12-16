import type { Layer } from "effect";
import { builder } from "./schema-builder.js";

import "./types/todo.type.js";
import "./types/payloads.type.js";
import "./types/inputs.type.js";
import { createTodoMutations } from "./mutations/todo.mutations.js";
import { createTodoQueries } from "./queries/todo.queries.js";

export const createSchema = <R>(layer: Layer.Layer<R, never, unknown>) => {
  createTodoQueries(layer);
  createTodoMutations(layer);

  return builder.toSchema();
};
