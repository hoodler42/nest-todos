import { z } from "zod";

export const todoDTOSchema = z.object({
    id: z.uuid(),
    title: z.string(),
    isDone: z.boolean(),
});

export type TodoDTO = z.infer<typeof todoDTOSchema>;
