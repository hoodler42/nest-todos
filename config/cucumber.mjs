// const common = {
//   loader: ["ts-node/esm"],
//   paths: ["src/modules/**/tests/**/*.feature"],
//   format: ["@cucumber/pretty-formatter"],
//   formatOptions: {
//     theme: {
//       "datatable border": ["green"],
//       "datatable content": ["green", "italic"],
//       "docstring content": ["green", "italic"],
//       "docstring delimiter": ["green"],
//       "feature description": ["green"],
//       "feature keyword": ["bold", "green"],
//       "rule keyword": ["yellow"],
//       "scenario keyword": ["greenBright"],
//       "scenario name": ["green", "underline"],
//       "step keyword": ["bgGreen", "black", "italic"],
//       "step text": ["greenBright", "italic"],
//       tag: ["green"],
//     },
//   },
// }
//
// // export const e2e = {
// //   ...common,
// //   import: ["src/modules/**/tests/**/*.e2e.steps.ts"],
// // }
// //
// // export const integration = {
// //   ...common,
// //   import: ["src/modules/**/tests/**/*.integration.steps.ts"],
// // }
//
// export const unit = {
//   ...common,
//   import: ["src/modules/**/*.unit.ts"],
//   parallel: 4,
// }
//
// export default {}
