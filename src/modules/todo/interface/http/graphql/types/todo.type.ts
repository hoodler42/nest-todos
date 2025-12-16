import { builder } from "../schema-builder.js";
import type { TodoEntity } from "../../../../core/domain/entities/todo.entity.js";

export const TodoType = builder.objectRef<TodoEntity>("Todo").implement({
    description: "A todo item",
    fields: (t) => (
        {
            id: t.exposeID("id", {
                description: "Unique identifier",
            }),
            title: t.exposeString("title", {
                description: "The todo title",
            }),
            isDone: t.exposeBoolean("isDone", {
                description: "Completion status",
            }),
            titleLength: t.int({
                description: "Character count of the title",
                resolve: (parent) => parent.title.length,
            }),
            titleUppercase: t.string({
                description: "Uppercase version of title",
                resolve: (parent) => parent.title.toUpperCase(),
            }),
        }
    ),
});
