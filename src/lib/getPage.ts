import { notFound } from "next/navigation";
import { GetPageByUriQuery } from "../__generated__/cms-schema.codegen";
import { getCMSClient } from "./getCMSClient";

type CommonPage<T> = T & {
  title: string;
};

type HockeyTemplateData = {
  template: "hockey";
  team: Array<any>;
};

type StandardTemplateData = {
  template: "standard";
  content: string | null;
};

const getStandardPageData = (
  data: GetPageByUriQuery
): CommonPage<StandardTemplateData> => {
  if (!data.page?.content || !data.page.title) {
    return notFound();
  }

  return {
    title: data.page.title,
    content: data.page.content,
    template: "standard",
  };
};

const getHockeyPageData = (
  data: GetPageByUriQuery
): CommonPage<HockeyTemplateData> => {
  if (!data.page?.title) {
    return notFound();
  }

  return {
    title: data.page.title,
    template: "hockey",
    team: ["test"],
  };
};

export type Page = CommonPage<HockeyTemplateData | StandardTemplateData>;

export const getPage = async (uri: string): Promise<Page> => {
  const client = getCMSClient();
  const data = await client.getPageByUri({ uri });

  if (!data.page?.pageACF?.template) {
    return notFound();
  }

  switch (data.page.pageACF.template) {
    case "hockey": {
      return getHockeyPageData(data);
    }
    default: {
      return getStandardPageData(data);
    }
  }
};
