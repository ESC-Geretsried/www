import { getCMSClient } from "./getCMSClient";
import { divisionsWithNesting } from "./types";

export const getPagePaths = async () => {
  const client = getCMSClient();

  const pathsResult = await client.getPagePaths();

  if (!pathsResult.pages?.nodes?.length) {
    throw new Error("No Pages for paths found");
  }

  const allPaths = pathsResult.pages.nodes
    .map((item) => {
      return item?.uri;
    })
    .filter(Boolean)
    .filter((item) => item !== "/home/") // NOTE: we don't need home as a static path, this will be our index page
    .map((item) => item.split("/").filter(Boolean));

  const rootPaths = allPaths
    .filter(
      (item) => item.length === 1 && !divisionsWithNesting.includes(item[0])
    )
    .map(([division]) => ({ division }));

  const nestedPaths = allPaths
    .filter((item) => item.length === 2)
    .map(([division, page]) => {
      return {
        division,
        page,
      };
    });

  return { rootPaths, nestedPaths };
};
