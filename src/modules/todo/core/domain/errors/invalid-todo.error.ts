export class InvalidTodoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidTodoError";
    }
}
