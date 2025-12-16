import { builder } from "../schema-builder.js";

export const CreateTodoInputType = builder.inputType("CreateTodoInput", {
    description: "Input for creating a todo",
    fields: (t) => (
        {
            title: t.string({
                required: true,
                description: "The todo title",
            }),
        }
    ),
});
