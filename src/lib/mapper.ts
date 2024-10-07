import type { DTO } from "./data-objects/dto.js"
import type { Entity } from "./data-objects/entity.js"
import type { Model } from "./data-objects/model.js"

export abstract class Mapper<EntityProps> {
  abstract toEntityFromModel(model: Model): Entity<EntityProps>

  abstract toDTOFromEntity(entity: Entity<EntityProps>): DTO
}
