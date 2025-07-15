import { ObjectType } from "@nestjs/graphql";
import { TodoGQL } from "../dto/todo.graphql.js";

@ObjectType()
export class CreateTodoSuccess extends TodoGQL {}
