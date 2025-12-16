import { Effect } from "effect";
import { z } from "zod";
import { InvalidTodoError } from "../errors/invalid-todo.error.js";

const todoPropsSchema = z.object({
    id: z.string().uuid(),
    title: z.string()
        .min(6, "Title must be at least 6 characters long")
        .max(100, "Title must be at most 100 characters long")
        .trim()
        .refine(title => !title.includes("Error"), {
            message: "Title cannot contain the word 'Error'",
        }),
    isDone: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type TodoEntity = z.infer<typeof todoPropsSchema>;

type CreateTodoProps = {
    readonly id: string;
    readonly title: string;
}

interface FromPersistenceProps {
    readonly id: string;
    readonly title: string;
    readonly isDone: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

const validateTodo = (props: TodoEntity): Effect.Effect<TodoEntity, InvalidTodoError> =>
    Effect.try({
        try: () => todoPropsSchema.parse(props),
        catch: (error: unknown) => {
            const message = error instanceof z.ZodError
                            ? error.issues.map((issue) => issue.message).join(", ")
                            : String(error);
            return new InvalidTodoError({ message });
        },
    });

export const TodoEntity = {
    create: (props: CreateTodoProps): Effect.Effect<TodoEntity, InvalidTodoError> => {
        const now = new Date();
        return validateTodo({
            id: props.id,
            title: props.title,
            isDone: false,
            createdAt: now,
            updatedAt: now,
        });
    },

    fromPersistence: (props: FromPersistenceProps): Effect.Effect<TodoEntity, InvalidTodoError> =>
        validateTodo(props),

    markDone: (todo: TodoEntity): TodoEntity => (
        {
            ...todo,
            isDone: true,
            updatedAt: new Date(),
        }
    ),

    markUndone: (todo: TodoEntity): TodoEntity => (
        {
            ...todo,
            isDone: false,
            updatedAt: new Date(),
        }
    ),
};
