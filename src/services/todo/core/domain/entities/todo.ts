import { z } from "zod"
import { DomainEntity, type InstantiateEntityProps } from "../../../../../lib/entities/domain.entity.js"

export const TodoSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
})
export type TodoProps = z.infer<typeof TodoSchema>

export interface CreateTodoProps {
  id: string
  title: string
}

export class Todo extends DomainEntity<TodoProps> {
  /**
   * Should be used in mapper only
   */
  constructor(instantiateTodoProps: InstantiateEntityProps<TodoProps>) {
    super(instantiateTodoProps, TodoSchema)
  }

  public static create(createProps: CreateTodoProps) {
    const todoProps = { title: createProps.title, isCompleted: false }

    return new Todo({ id: createProps.id, props: todoProps })
  }

  public get title() {
    return this.props.title
  }

  public get isCompleted() {
    return this.props.isCompleted
  }
}
