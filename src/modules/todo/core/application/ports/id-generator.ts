import { Context } from "effect";

export interface IdGenerator {
    readonly generate: () => string;
}

export const IdGenerator = Context.GenericTag<IdGenerator>("IdGenerator");
