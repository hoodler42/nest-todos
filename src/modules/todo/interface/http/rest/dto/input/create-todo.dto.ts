import { z } from "zod";

export const CreateTodoDtoSchema = z.object({
    title: z.string(),
});

export type CreateTodoDto = z.infer<typeof CreateTodoDtoSchema>
