import { GraphQLClient } from "graphql-request";
import { getSdk } from "../__generated__/cms-schema.codegen";
import { env } from "./env.js";

export const getCMSClient = (forcePreview = false) => {
  const client = new GraphQLClient(env.GRAPHQL_BACKEND_URL);

  return getSdk(client);
};

export type CMSClientType = ReturnType<typeof getCMSClient>;
