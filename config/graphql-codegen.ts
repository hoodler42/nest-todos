import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/modules/todo/interface/http/graphql/todo.schema.graphql",
  documents: "src/modules/todo/interface/http/graphql/client-request/*.graphql",
  emitLegacyCommonJSImports: false,
  generates: {
    "src/services/todo/interface/http/graphql/client-request/sdk.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
    },
  },
}

export default config
