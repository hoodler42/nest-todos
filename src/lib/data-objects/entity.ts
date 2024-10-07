import { ValueObject } from "./value-object.js"

export interface InstantiateEntityProps<T> {
  id: string
  createdAt?: Date
  updatedAt?: Date
  props: T
}

export abstract class Entity<EntityProps> extends ValueObject<EntityProps> {
  public readonly id: string
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor({ id, createdAt, updatedAt, props }: InstantiateEntityProps<EntityProps>) {
    super(props)
    this.id = id
    const now = new Date()
    this.createdAt = createdAt || now
    this.updatedAt = updatedAt || now
    this.validateEntity()
  }

  private validateEntity() {
    // validate id and dates
  }
}
