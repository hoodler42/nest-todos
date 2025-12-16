import { Data } from "effect";

export class InvalidTodoError extends Data.TaggedError("InvalidTodoError")<{
  readonly message: string;
}> {}

export function isInvalidTodoError(error: unknown): error is InvalidTodoError {
  return error instanceof InvalidTodoError;
}
