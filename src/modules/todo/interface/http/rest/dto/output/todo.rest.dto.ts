import { IsBoolean, IsString, IsUUID } from "class-validator";
import type { TodoDTO } from "../../../../dto/todo.dto.js";

export class TodoRestDTO implements TodoDTO {
    @IsString()
    @IsUUID()
    id!: string;

    @IsString()
    title!: string;

    @IsBoolean()
    isCompleted!: boolean;
}
