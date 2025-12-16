import { Effect, type Layer } from "effect";

import { CreateTodoUseCase } from "../../../../core/application/use-cases/create-todo.use-case.js";
import type { InvalidTodoError } from "../../../../core/domain/errors/invalid-todo.error.js";
import { builder } from "../schema-builder.js";
import { CreateTodoInputType } from "../types/inputs.type.js";
import { CreateTodoPayloadType } from "../types/payloads.type.js";

export const createTodoMutations = <R>(layer: Layer.Layer<R, never, unknown>) => {
  builder.mutationType({
    description: "Root mutation type",
    fields: t => ({
      createTodo: t.field({
        description: "Create a new todo",
        type: CreateTodoPayloadType,
        args: {
          input: t.arg({
            type: CreateTodoInputType,
            required: true,
          }),
        },
        resolve: async (_parent, args) => {
          const program = Effect.gen(function* () {
            const todo = yield* CreateTodoUseCase.execute({
              title: args.input.title,
            });
            return { todo };
          });

          return await Effect.runPromise(
            program.pipe(
              Effect.catchAll(error => {
                if (
                  error &&
                  typeof error === "object" &&
                  "_tag" in error &&
                  error._tag === "InvalidTodoError"
                ) {
                  return Effect.succeed({
                    message: (error as InvalidTodoError).message,
                  });
                }
                throw error;
              }),
              Effect.provide(layer),
            ) as Effect.Effect<
              | {
                  todo: {
                    id: string;
                    title: string;
                    isDone: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                  };
                }
              | { message: string },
              never,
              never
            >,
          );
        },
      }),
    }),
  });
};
