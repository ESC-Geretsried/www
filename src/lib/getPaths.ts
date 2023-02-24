import { getCMSClient } from "./getCMSClient";

export const hockeyDivisions = [
  "damen",
  "1b",
  "u17",
  "u15",
  "u13",
  "u11",
  "u9",
  "u7",
] as const;

export const divisionsWithNesting = [
  "verein",
  "river-rats",
  "eishockey",
] as const;

const divisionsWithoutNesting = [
  "eiskunstlauf",
  "eislaufschule",
  "inklusionssport",
];

const allDivisions = [
  ...hockeyDivisions,
  ...divisionsWithNesting,
  ...divisionsWithoutNesting,
];

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
