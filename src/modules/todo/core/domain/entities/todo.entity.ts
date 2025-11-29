import { Result } from "typescript-result";
import { Entity, type EntityProps } from "../../../../../lib/data-objects/entity.js";
import { InvalidTodoError } from "../errors/invalid-todo.error.js";
import { z } from "zod";

const todoPropsSchema = z.object({
    title: z.string()
        .min(6, "Title must be at least 6 characters long")
        .max(100, "Title must be at most 100 characters long")
        .trim()
        .refine(title => !title.includes("Error"), {
            message: "Title cannot contain the word 'Error'",
        }),
    isCompleted: z.boolean(),
});
type TodoEntityProps = EntityProps & z.infer<typeof todoPropsSchema>;

export class TodoEntity extends Entity {
    public readonly title: string;
    public readonly isCompleted: boolean;

    private constructor(props: TodoEntityProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this.title = props.title;
        this.isCompleted = props.isCompleted;
    }

    public static create(createTodoPayload: Pick<TodoEntity, "id" | "title">): Result<TodoEntity, InvalidTodoError> {
        return Entity.build(
            () => new TodoEntity({
                id: createTodoPayload.id,
                title: createTodoPayload.title,
                isCompleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            todoPropsSchema,
            (message) => new InvalidTodoError(message),
        );
    }

    public static fromPersistence(props: TodoEntityProps): Result<TodoEntity, InvalidTodoError> {
        return Entity.build(
            () => new TodoEntity(props),
            todoPropsSchema,
            (message) => new InvalidTodoError(message),
        );
    }
}
