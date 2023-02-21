import { getCMSClient } from "./getCMSClient";

export const getHomePage = async () => {
  const client = getCMSClient();
  const data = await client.getPageByUri({ uri: "/home/" });
};
