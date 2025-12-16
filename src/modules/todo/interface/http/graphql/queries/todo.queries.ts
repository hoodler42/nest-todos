import { Effect, type Layer } from "effect";
import { listTodos } from "../../../../core/application/use-cases/list-todos.use-case.js";
import { builder } from "../schema-builder.js";
import { TodoType } from "../types/todo.type.js";

export const createTodoQueries = <R>(layer: Layer.Layer<R, never, unknown>) => {
  builder.queryType({
    description: "Root query type",
    fields: t => ({
      listTodos: t.field({
        description: "List all todos",
        type: [TodoType],
        resolve: async () => {
          const program = Effect.gen(function* () {
            return yield* listTodos();
          });

          return await Effect.runPromise(
            program.pipe(Effect.provide(layer)) as Effect.Effect<
              {
                id: string;
                title: string;
                isDone: boolean;
                createdAt: Date;
                updatedAt: Date;
              }[],
              never,
              never
            >,
          );
        },
      }),
    }),
  });
};
