import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import type { OrmEntity } from "../../../../../lib/entities/orm.entity.js"

@Entity("todo")
export class TodoTypeOrm implements OrmEntity {
  @PrimaryGeneratedColumn("uuid")
  public id!: string

  @Column("text")
  public title!: string

  @Column({ type: "boolean", default: false })
  public isCompleted!: boolean
}
