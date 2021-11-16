import {
  ConfidentialClientApplication,
  Configuration,
  ClientCredentialRequest,
} from "@azure/msal-node";
import "isomorphic-fetch";
import { AuthProvider } from "@microsoft/microsoft-graph-client";
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
    "/calendarview",
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

export const authProvider: AuthProvider = async (callback) => {
  const authResponse = await getToken(tokenRequest);
  if (authResponse === null) {
    callback("Error while getting token", null);
    return;
  }
  callback(null, authResponse.accessToken);
  return;
};

export const getThisWeeksMonday = (now: Date) => {
  const d = new Date(now);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday

  return new Date(d.setDate(diff));
};

export const getThisWeeksFriday = (now: Date) => {
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -2 : 5); // adjust when day is sunday

  return new Date(now.setDate(diff));
};

export const getThisWeeksSaturday = (now: Date) => {
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -1 : 6); // adjust when day is sunday

  return new Date(now.setDate(diff));
};

export const getThisWeeksSunday = (now: Date) => {
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? 0 : 7); // adjust when day is sunday

  return new Date(now.setDate(diff));
};

export const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day >= 5 || day === 0;
};
