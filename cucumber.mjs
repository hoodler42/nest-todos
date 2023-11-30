import { register } from "node:module"
import { pathToFileURL } from "node:url"

register("ts-node/esm", pathToFileURL("./"))

const common = {
  import: ["features/**/*.steps.ts"],
}

export default {
  ...common,
  format: ["@cucumber/pretty-formatter"],
  formatOptions: {
    theme: {
      "datatable border": ["green"],
      "datatable content": ["green", "italic"],
      "docstring content": ["green", "italic"],
      "docstring delimiter": ["green"],
      "feature description": ["green"],
      "feature keyword": ["bold", "green"],
      "rule keyword": ["yellow"],
      "scenario keyword": ["greenBright"],
      "scenario name": ["green", "underline"],
      "step keyword": ["bgGreen", "black", "italic"],
      "step text": ["greenBright", "italic"],
      tag: ["green"],
    },
  },
}

export const ci = {
  ...common,
  format: ["html:cucumber-report.html"],
  publish: true,
}
