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
  plugins: ["graphql"],
  rules: {
    "no-console": "warn", // don't check in console.logs into my code base ;)
    "@typescript-eslint/no-unsafe-return": "off", // for some reason this lints differently in CI sometimes and it's annoying
    "jsx-a11y/accessible-emoji": "off", // we can disable this, because we replace emojis with images:
    "graphql/template-strings": [
      "error",
      {
        env: "relay",
        tagName: "graphql",
        schemaJsonFilepath: path.resolve(
          __dirname,
          "src/__generated__gatsby-introspection.json"
        ),
      },
    ],
  },
};
