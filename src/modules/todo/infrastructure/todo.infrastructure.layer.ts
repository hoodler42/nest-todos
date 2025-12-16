import { Layer } from "effect";

import { TodoPersistenceLayer } from "./persistence/todo.persistence.layer.js";
import { TodoIdGeneratorLayer } from "./id-generator/todo.id-generator.layer.js";

export const TodoInfrastructureLayer = TodoIdGeneratorLayer.pipe(
    Layer.merge(TodoPersistenceLayer),
);
