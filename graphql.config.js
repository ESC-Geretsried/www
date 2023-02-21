// @ts-check
require("dotenv").config();
const { env } = require("./src/lib/env.js");

const genFilename = "cms-schema.codegen.ts";
const endpoint = env.GRAPHQL_BACKEND_URL;

const config = {
  schema: [endpoint],
  extensions: {
    codegen: {
      generates: {
        [`./src/__generated__/${genFilename}`]: {
          documents: "./src/queries/**/*.graphql",
          plugins: [
            "typescript",
            "typescript-operations",
            "typescript-graphql-request",
          ],
          config: {
            nonOptionalTypename: true,
            avoidOptionals: {
              field: true,
              inputValue: false,
              object: true,
              defaultValue: true,
            },
            maybeValue: "T | null",
            dedupeFragments: true,
            namingConvention: { enumValues: "keep" },
            scalars: {
              ItemId: "string",
              BooleanType: "boolean",
              FloatType: "number",
              IntType: "number",
            },
            fetcher: {
              endpoint,
            },
          },
        },
      },
    },
  },
};

module.exports = config;
