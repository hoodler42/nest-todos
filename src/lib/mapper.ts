import type { DomainEntity } from "./entities/domain.entity.js"
import type { DtoEntity } from "./entities/dto.entity.js"
import type { OrmEntity } from "./entities/orm.entity.js"

export abstract class Mapper<DomainEntityProps> {
  abstract toOrmFromDomain(domainEntity: DomainEntity<DomainEntityProps>): OrmEntity

  abstract toDomainFromOrm(ormEntity: OrmEntity): DomainEntity<DomainEntityProps>

  abstract toDomainFromDto(dtoEntity: DtoEntity): DomainEntity<DomainEntityProps>

  abstract toDTOFromDomain(domainEntity: DomainEntity<DomainEntityProps>): DtoEntity
}
