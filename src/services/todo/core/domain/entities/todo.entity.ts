import { z } from "zod"
import { Entity } from "../../../../../lib/data-objects/entity.js"

export const TodoSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
})
export type TodoProps = z.infer<typeof TodoSchema>

export interface CreateTodoProps {
  id: string
  title: string
}

export class TodoEntity extends Entity<TodoProps> {
  public static create(createTodoProps: Pick<TodoEntity, "id" | "title">) {
    return new TodoEntity({
      id: createTodoProps.id,
      props: { title: createTodoProps.title, isCompleted: false },
    })
  }

  protected override validateProps() {}

  public get title() {
    return this.props.title
  }

  public get isCompleted() {
    return this.props.isCompleted
  }
}
