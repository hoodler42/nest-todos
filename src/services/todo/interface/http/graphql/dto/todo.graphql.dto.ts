import { Field, ObjectType } from "@nestjs/graphql"
import type { TodoDTO } from "../../../dto/todo.dto.js"

@ObjectType()
export class TodoGraphqlDTO implements TodoDTO {
  @Field()
  id!: string

  @Field()
  title!: string

  @Field()
  isCompleted!: boolean
}
