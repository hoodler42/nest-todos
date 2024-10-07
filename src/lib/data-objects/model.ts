import { CreateDateColumn, UpdateDateColumn } from "typeorm"

export abstract class Model {
  @CreateDateColumn({ type: "timestamptz", nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date

  @UpdateDateColumn({ type: "timestamptz", nullable: false, default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date
}
