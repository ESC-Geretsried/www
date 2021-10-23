const path = require("path");

module.exports = {
  extends: [
    "peerigon",
    "peerigon/react",
    "peerigon/typescript",
    "peerigon/styles/prefer-arrow",
    "prettier",
  ],
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
    "@typescript-eslint/naming-convention": "off",
    "import/no-anonymous-default-export": "off",
    "babel/object-curly-spacing": 0,
    "react/no-unescaped-entities": 0,
    "jsdoc/no-undefined-types": 0,
    "jsdoc/check-access": 0,
    "jsdoc/check-examples": 0,
    "jsdoc/check-alignment": 0,
    "jsdoc/require-property-type": 0,
    "jsdoc/check-indentation": 0,
    "jsdoc/require-property-name": 0,
    "jsdoc/require-hyphen-before-param-description": 0,
    "jsdoc/check-property-names": 0,
    "jsdoc/check-tag-names": 0,
    "jsdoc/check-types": 0,
    "jsdoc/newline-after-description": 0,
    "jsdoc/empty-tags": 0,
    "jsdoc/valid-types": 0,
    "babel/new-cap": 0,
    "react/display-name": 0,
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
