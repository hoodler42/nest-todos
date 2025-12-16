import { builder } from "../schema-builder.js";
import { TodoType } from "./todo.type.js";

export const CreateTodoSuccessType = builder.simpleObject("CreateTodoSuccess", {
    description: "Successful todo creation",
    fields: (t) => (
        {
            todo: t.field({
                type: TodoType,
                description: "The created todo",
            }),
        }
    ),
});

export const InvalidTodoErrorType = builder.simpleObject("InvalidTodoError", {
    description: "Invalid todo data error",
    fields: (t) => (
        {
            message: t.string({
                description: "Error message",
            }),
        }
    ),
});

export const CreateTodoPayloadType = builder.unionType("CreateTodoPayload", {
    description: "Result of creating a todo",
    types: [CreateTodoSuccessType, InvalidTodoErrorType],
    resolveType: (value) => {
        if ("todo" in value) {
            return "CreateTodoSuccess";
        }
        return "InvalidTodoError";
    },
});
