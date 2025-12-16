import { Layer } from "effect";
import { ConfigLayer } from "./config.layer.js";
import { TodoLayer } from "./modules/todo/todo.layer.js";

export const AppLayer = Layer.mergeAll(
    ConfigLayer,
    TodoLayer.pipe(Layer.provide(ConfigLayer)),
);

export type AppLayer = Layer.Layer.Success<typeof AppLayer>;
