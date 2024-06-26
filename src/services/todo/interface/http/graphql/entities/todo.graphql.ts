import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class TodoGraphql {
  @Field()
  id!: string

  @Field()
  title!: string

  @Field()
  isCompleted!: boolean
}
