import msal, { Configuration, ClientCredentialRequest } from "@azure/msal-node";

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
  uri: process.env.GRAPH_ENDPOINT + "v1.0/users/" + process.env.CALENDAR_USER + "/calendars",
  uriCal:
    process.env.GRAPH_ENDPOINT +
    "v1.0/users/" +
    process.env.CALENDAR_USER +
    "/calendars/" +
    process.env.CALENDAR_ID +
    "/events?" +
    process.env.CALENDAR_OPTIONS,
};

/**
 * Initialize a confidential client application. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
 */
const cca = new msal.ConfidentialClientApplication(msalConfig);

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest
 */
export const getToken = async (tokenRequest: ClientCredentialRequest) => {
  return cca.acquireTokenByClientCredential(tokenRequest);
}
