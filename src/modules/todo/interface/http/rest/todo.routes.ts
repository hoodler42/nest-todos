import { Effect, type Layer } from "effect";
import type { Context } from "hono";
import { Hono } from "hono";
import { CreateTodoUseCase } from "../../../core/application/use-cases/create-todo.use-case.js";
import { listTodos } from "../../../core/application/use-cases/list-todos.use-case.js";
import type { InvalidTodoError } from "../../../core/domain/errors/invalid-todo.error.js";
import { todoMapper } from "../../../todo.mapper.js";
import type { CreateTodoInput } from "../../dto/input/create-todo.input.js";
import { createTodoDtoSchema } from "../../dto/input/create-todo.input.js";
import type { TodoDTO } from "../../dto/output/todo.dto.js";

const isErrorResponse = (value: unknown): value is Response =>
  typeof value === "object" && value !== null && "status" in value;

const parseJsonBody = (context: Context): Effect.Effect<unknown, Error> =>
  Effect.tryPromise({
    try: () => context.req.json(),
    catch: () => new Error("Invalid JSON body"),
  });

const validateCreateTodoInput = (requestBody: unknown): Effect.Effect<CreateTodoInput, Error> =>
  Effect.try({
    try: () => createTodoDtoSchema.parse(requestBody),
    catch: validationError => new Error(`Validation failed: ${validationError}`),
  });

const handleGenericError = (error: unknown, context: Context): Effect.Effect<Response, never> =>
  Effect.succeed(context.json({ error: String(error) }, 500));

export const createTodoRoutes = <Dependencies>(
  effectLayer: Layer.Layer<Dependencies, never, unknown>,
) => {
  const todoRoutes = new Hono();

  todoRoutes.get("/", async (context: Context): Promise<Response> => {
    const listTodosProgram = Effect.gen(function* () {
      const todos = yield* listTodos();
      return todos.map(todoMapper.toDTOFromDomain);
    });

    const providedProgram = listTodosProgram.pipe(
      Effect.catchAll(error => handleGenericError(error, context)),
      Effect.provide(effectLayer),
    );

    const todosOrErrorResponse: Response | TodoDTO[] = await Effect.runPromise(
      providedProgram as Effect.Effect<Response | TodoDTO[], never, never>,
    );

    if (isErrorResponse(todosOrErrorResponse)) {
      return todosOrErrorResponse;
    }

    return context.json(todosOrErrorResponse);
  });

  todoRoutes.post("/", async (context: Context): Promise<Response> => {
    const createTodoProgram = Effect.gen(function* () {
      const requestBody = yield* parseJsonBody(context);
      const validatedInput = yield* validateCreateTodoInput(requestBody);
      const createdTodo = yield* CreateTodoUseCase.execute({ title: validatedInput.title });
      return todoMapper.toDTOFromDomain(createdTodo);
    });

    const providedProgram = createTodoProgram.pipe(
      // Effect.catchAll(error => {
      //   if (isInvalidTodoError(error)) {
      //     return Effect.succeed(context.json({ error: error.message }, 400));
      //   }
      //   return handleGenericError(error, context);
      // }),

      Effect.provide(effectLayer),
      Effect.catchTags({
        InvalidTodoError: (error: InvalidTodoError) =>
          Effect.succeed(context.json({ error: error.message }, 400)),
      }),
    );

    const todoOrErrorResponse: Response | TodoDTO = await Effect.runPromise(
      providedProgram as Effect.Effect<Response | TodoDTO, never, never>,
    );

    if (isErrorResponse(todoOrErrorResponse)) {
      return todoOrErrorResponse;
    }

    return context.json(todoOrErrorResponse, 201);
  });

  return todoRoutes;
};
