import { notFound } from "next/navigation";
import {
  GetPageByUriQuery,
  SeoFragment,
} from "../../__generated__/cms-schema.codegen";
import { getCMSClient } from "../getCMSClient";
import {
  getStandardPageData,
  StandardTemplateData,
} from "./getStandardPageData";

type Seo = Omit<SeoFragment, "__typename">;

export type CommonPage<T> = T & {
  title: string;
  seo: Seo | null;
};

type HockeyTemplateData = {
  template: "hockey";
  team: Array<any>;
};

type LineupTemplateData = {
  template: "lineup";
  team: Array<any>;
};

type LineupBoardTemplateData = {
  template: "lineup_board";
  boardMembers: Array<any>;
};

const getHockeyPageData = (
  data: GetPageByUriQuery
): CommonPage<HockeyTemplateData> => {
  if (!data.page?.title) {
    return notFound();
  }

  const seo = data.page.pageACF?.seo ?? null;

  return {
    template: "hockey",
    title: data.page.title,
    team: ["test"],
    seo,
  };
};

const getLineupPageData = (
  data: GetPageByUriQuery
): CommonPage<LineupTemplateData> => {
  if (!data.page?.title || !data.page.pageACF?.lineup?.team) {
    return notFound();
  }
  const seo = data.page.pageACF.seo ?? null;

  return {
    template: "lineup",
    title: data.page.title,
    team: data.page.pageACF.lineup.team,
    seo,
  };
};

const getLineupBoardPageData = (
  data: GetPageByUriQuery
): CommonPage<LineupBoardTemplateData> => {
  if (!data.page?.title || !data.page.pageACF?.boardMembers) {
    return notFound();
  }

  const seo = data.page.pageACF.seo ?? null;

  return {
    template: "lineup_board",
    title: data.page.title,
    boardMembers: data.page.pageACF.boardMembers,
    seo,
  };
};

export type Page = CommonPage<
  | HockeyTemplateData
  | StandardTemplateData
  | LineupTemplateData
  | LineupBoardTemplateData
>;

export const getPage = async (uri: string): Promise<Page> => {
  if (uri === "home") {
    notFound();
  }
  const client = getCMSClient();
  const data = await client.getPageByUri({ uri });

  if (!data.page?.pageACF?.template) {
    console.error("getPage didn't find page with the uri", uri);

    return notFound();
  }

  switch (data.page.pageACF.template) {
    case "hockey": {
      return getHockeyPageData(data);
    }

    case "standard": {
      return getStandardPageData(data);
    }

    case "lineup_board": {
      return getLineupBoardPageData(data);
    }

    case "lineup": {
      return getLineupPageData(data);
    }

    default: {
      const never = data as never;

      return never;
    }
  }
};

export const getPageUriFromParams = (params: {
  division: string;
  page: string;
}) => {
  return `${params.division}/${params.page}`;
};
