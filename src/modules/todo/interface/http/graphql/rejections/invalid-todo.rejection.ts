import { Field, ObjectType } from "@nestjs/graphql";
import type { InvalidTodoError } from "../../../../core/domain/errors/invalid-todo.error.js";

@ObjectType()
export class InvalidTodoRejection {
    @Field()
    reason!: string;

    constructor(error: InvalidTodoError) {
        this.reason = error.message;
    }
}
