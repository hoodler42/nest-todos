import { z } from "zod";

export const createTodoDtoSchema = z.object({
    title: z.string(),
});

export type CreateTodoInput = z.infer<typeof createTodoDtoSchema>
