import type { Layer } from "effect";
import { createYoga } from "graphql-yoga";
import { createSchema } from "./schema.js";

export const createYogaServer = <R>(layer: Layer.Layer<R, never, unknown>) => {
  const schema = createSchema(layer);

  return createYoga({
    schema,
    graphqlEndpoint: "/graphql",
    graphiql: true,
  });
};
