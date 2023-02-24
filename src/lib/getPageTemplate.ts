import { notFound } from "next/navigation";
import { getCMSClient } from "./getCMSClient";

const templates = [
  "standard",
  "home",
  "tickets",
  "lineup",
  "lineup_board",
  "hockeyTeam",
  "gamepitch",
  "sponsors",
  "shop",
] as const;

type Templates = typeof templates[number];

export const getPageTemplate = async (uri: string): Promise<Templates> => {
  if (uri === "home") {
    return "home";
  }
  const client = getCMSClient();
  const data = await client.getPageByUri({ uri });

  if (!data.page?.pageACF?.template) {
    console.error("getPageTemplate didn't find page with the uri", uri);
    notFound();
  }

  return data.page.pageACF.template as Templates;
};
