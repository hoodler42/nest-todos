import { IsBoolean, IsString } from "class-validator";
import { Result } from "typescript-result";
import { Entity } from "../../../../../lib/data-objects/entity.js";
import { InvalidTodoError } from "../../application/errors/invalid-todo.error.js";

export class TodoProps {
  @IsString()
  title!: string

  @IsBoolean()
  isCompleted!: boolean
}

export class TodoEntity extends Entity<TodoProps> {
  public get title() {
    return this.props.title
  }

  public get isCompleted() {
    return this.props.isCompleted
  }

  public static create(createTodoProps: Pick<TodoEntity, "id" | "title">): Result<TodoEntity, InvalidTodoError> {
    const newTodo = new TodoEntity({
      id: createTodoProps.id,
      props: { isCompleted: false, title: createTodoProps.title },
    })

    return newTodo.validateEntityProps().fold(
      () => Result.ok(newTodo),
      error => Result.error(error),
    )
  }

  protected override validateEntityProps(): Result<void, InvalidTodoError> {
    const titleValidationResult = this.validateTitle()
    if (titleValidationResult.isError()) {
      return Result.error(titleValidationResult.error)
    }
    return Result.ok()
  }

  private validateTitle(): Result<void, InvalidTodoError> {
    if (this.title.length < 6) {
      return Result.error(new InvalidTodoError("Title must be at least 6 characters long"))
    }
    if (this.title.length > 100) {
      return Result.error(new InvalidTodoError("Title must be at most 100 characters long"))
    }
    if (this.title.includes("Error")) {
      return Result.error(new InvalidTodoError("Title cannot contain the word 'Error'"))
    }
    return Result.ok()
  }
}
