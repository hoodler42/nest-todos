import { v4 as uuid } from "uuid";
import type { IdGenerator } from "../../../core/application/ports/id-generator/id-generator.js";

export class UUIDGenerator implements IdGenerator {
    generate(): string {
        return uuid();
    }
}
