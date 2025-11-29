import { describe } from "vitest";
import type { TodoEntity } from "./todo.entity.js";

export function givenValidTitle(cb: (validTitle: TodoEntity["title"]) => void) {
    describe("Given the title is valid", () => {
        const validTitle = "Valid Todo Title";

        return cb(validTitle);
    });
}

export function givenInvalidTitle(cb: (
    invalidTitle: TodoEntity["title"],
    errorReason: string) => void) {
    describe("Given the title is invalid", () => {
        describe.each([
            ["is not long enough", "Hello", "Title must be at least 6 characters long"],
            ["is too long", String("a".repeat(101)), "Title must be at most 100 characters long"],
            [
                `contains the word "Error"`, "This is an Error",
                "Title cannot contain the word 'Error'",
            ],
        ])(
            "Given the title %s",
            (_: string, invalidTitle: TodoEntity["title"], errorReason: string) =>
                cb(invalidTitle, errorReason),
        );
    });
}
