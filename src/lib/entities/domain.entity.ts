import type { z } from "zod"

export type ID = string

export interface InstantiateEntityProps<T> {
  id: ID
  props: T
}

export abstract class DomainEntity<EntityProps> {
  public readonly id: ID
  protected readonly props: EntityProps
  protected readonly validationSchema: z.ZodType<EntityProps>

  protected constructor({ id, props }: InstantiateEntityProps<EntityProps>, validationSchema: z.ZodType<EntityProps>) {
    this.id = id
    this.props = props
    this.validationSchema = validationSchema
    this.validate()
  }

  protected validate() {
    this.validationSchema.parse(this.props)
  }
}
