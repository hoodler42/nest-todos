import type { CodegenConfig } from "@graphql-codegen/cli";

const todoCodegenConfig: CodegenConfig = {
  documents: "tests/todo/graphql/**/*.graphql",
  importExtension: ".js",
  generates: {
    "tests/todo/graphql/todo.sdk.ts": {
      plugins: [
        { add: { content: "// @ts-nocheck" } },
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
  overwrite: true,
  schema: "src/modules/todo/interface/http/graphql/todo.schema.graphql",
};

export default todoCodegenConfig;
