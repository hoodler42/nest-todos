import { DTO } from "../../../../lib/data-objects/dto.js"

export interface TodoDTO extends DTO {
  id: string
  title: string
  isCompleted: boolean
}
