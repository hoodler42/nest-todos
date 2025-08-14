import { ObjectType } from "@nestjs/graphql";
import { TodoGqlDTO } from "../dto/todo.graphql.dto.js";

@ObjectType()
export class CreateTodoSuccess extends TodoGqlDTO {}
