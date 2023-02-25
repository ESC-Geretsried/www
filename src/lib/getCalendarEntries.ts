import { apiConfig, getToken, tokenRequest } from "./msal.utils";

const callApi = async (uri: string, accessToken: string) => {
  return fetch(uri, { headers: { Authorization: `Bearer ${accessToken}` } });
};

export const getCalendarEntries = async () => {
  try {
    const authResponse = await getToken(tokenRequest);

    if (authResponse?.accessToken) {
      const apiResponse = await callApi(
        apiConfig.uriCal,
        authResponse?.accessToken
      );
      const jsonData = await apiResponse.json();

      return jsonData;
    }

    console.error("No Access Token found!", authResponse);

    return null;
  } catch (error) {
    console.error("Graph Error: ", error);

    return null;
  }
};
