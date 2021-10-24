import { Handler } from "@netlify/functions";
import { Client } from "@microsoft/microsoft-graph-client";
import { Event } from "../../../src/types";
import {
  ConfidentialClientApplication,
  Configuration,
  ClientCredentialRequest,
} from "@azure/msal-node";
import "isomorphic-fetch";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
const msalConfig: Configuration = {
  auth: {
    clientId: process.env.CLIENT_ID!,
    authority: process.env.AAD_ENDPOINT! + process.env.TENANT_ID!,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

/**
 * With client credentials flows permissions need to be granted in the portal by a tenant administrator.
 * The scope is always in the format '<resource>/.default'. For more, visit:
 * https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow
 */
export const tokenRequest = {
  scopes: [process.env.GRAPH_ENDPOINT + ".default"],
};

export const apiConfig = {
  uri: "/users/" + process.env.CALENDAR_USER + "/calendars",
  uriCal:
    "/users/" +
    process.env.CALENDAR_USER +
    "/calendars/" +
    process.env.CALENDAR_ID +
    "/events",
};

/**
 * Initialize a confidential client application. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
 */
const cca = new ConfidentialClientApplication(msalConfig);

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest
 */
export const getToken = async (tokenRequest: ClientCredentialRequest) => {
  return cca.acquireTokenByClientCredential(tokenRequest);
};

const graphClient = Client.init({
  authProvider: async (callback) => {
    const authResponse = await getToken(tokenRequest);
    if (authResponse === null) {
      callback("Error while getting token", null);
      return;
    }
    callback(null, authResponse.accessToken);
    return;
  },
});

const callApi = (uri: string, accessToken: string) => {
  return fetch(uri, { headers: { Authorization: `Bearer ${accessToken}` } });
};

const handler: Handler = async (event, context) => {
  try {
    const events = (await graphClient
      .api(apiConfig.uriCal)
      .select("subject,body,bodyPreview,categories,start,end,location") // if adjusted please also adjust typings
      .get()) as Array<Event>;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: events }),
    };
  } catch (error) {
    console.log("Graph Error: ", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: error }),
    };
  }

  // return {
  //   statusCode: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ data: "works" }),
  // };
};

export { handler };
