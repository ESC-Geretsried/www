import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { getToken, tokenRequest, apiConfig } from "../../src/utils/functionUtils";

const callApi = (uri: string, accessToken: string) => {
  return fetch(uri, { headers: { Authorization: `Bearer ${accessToken}` } });
};

const handler: Handler = async (event, context) => {
  try {
    const authResponse = await getToken(tokenRequest);
    const apiResponse = await callApi(apiConfig.uriCal, authResponse.accessToken);
    const jsonData = await apiResponse.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: jsonData }),
    };
  } catch (error) {
    console.log("Graph Error: ", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error }),
    };
  }
};

export { handler };
