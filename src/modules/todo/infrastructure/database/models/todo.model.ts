import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Model } from "../../../../../lib/data-objects/model.js"

@Entity("todo")
export class TodoModel extends Model {
  @PrimaryGeneratedColumn("uuid")
  public id!: string

  @Column({ type: "text", nullable: false })
  public title!: string

  @Column({ type: "boolean", nullable: false, default: false })
  public isCompleted!: boolean
}
