import type { DTO } from "./data-objects/dto.js";
import type { Entity } from "./data-objects/entity.js";

export abstract class Mapper<
  EntityProps,
  DomainEntity extends Entity<EntityProps>,
  Model,
  RestDTO extends DTO,
  GqlDTO extends DTO,
> {
  abstract toDomainFromModel(model: Model): DomainEntity;

  abstract toModelFromDomain(entity: DomainEntity): Model;

  abstract toRestDTOFromDomain(entity: DomainEntity): RestDTO;

  abstract toGqlDTOFromDomain(entity: DomainEntity): GqlDTO;
}
