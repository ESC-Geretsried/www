const path = require("path");

module.exports = {
  extends: ["peerigon/presets/prettier-typescript-react.js"],
  env: {
    node: true,
    browser: true,
  },
  root: true,
  parserOptions: {
    // This path is relative to the CWD where eslint is executed
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md#parseroptionsproject
    project: ["./tsconfig.json"],
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
};
