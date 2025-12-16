import { Layer } from "effect";
import { v4 as uuid } from "uuid";

import { IdGenerator } from "../../../core/application/ports/id-generator.js";

export const UuidIdGenerator = Layer.succeed(IdGenerator, {
    generate: () => uuid(),
});
