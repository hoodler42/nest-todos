import { z } from "zod"

export const TodoDtoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  isCompleted: z.boolean(),
})

export type TodoDto = z.infer<typeof TodoDtoSchema>
