import { notFound } from "next/navigation";
import {
  GetPageByUriQuery,
  StandardContentFragment,
  DownloadFragment,
} from "../../__generated__/cms-schema.codegen";
import { NonNullableProperties, NoTypename } from "../types";
import { CommonPage } from "./getPage";

export type Download = Omit<
  NoTypename<NonNullableProperties<DownloadFragment>>,
  "mediaItemUrl" | "altText"
> & { href: string; altText: string | null };
export type AdditionalInfo = { title: string; content: string };
export type Contact = {
  name: string;
  email: string;
  tel: string | null;
  website: string | null;
};

export type StandardTemplateData = {
  template: "standard";
  id: string;
  content: string;
  categoryDatabaseId: number;
  downloads: Array<Download> | null;
  additionalInfo: AdditionalInfo | null;
  contact: Contact | null;
};

export const getStandardPageData = (
  data: GetPageByUriQuery
): CommonPage<StandardTemplateData> => {
  if (!data.page?.content || !data.page.title) {
    console.error("No content or title found", data);
    notFound();
  }

  if (!data.page.pageACF?.standardContent) {
    console.error("No ACF Standard Content found", data);
    notFound();
  }

  const categoryDatabaseId = data.page.categories?.nodes?.[0]?.databaseId;

  if (!categoryDatabaseId) {
    console.error("No categoryDatabaseId found", data);
    notFound();
  }

  const seo = data.page.pageACF.seo ?? null;
  const downloads = getDownloads(data);
  const additionalInfo = getAdditionalData(data);
  const contact = getContactData(data);

  return {
    template: "standard",
    title: data.page.title,
    content: data.page.content,
    id: data.page.id,
    downloads,
    additionalInfo,
    categoryDatabaseId,
    contact,
    seo,
  };
};

const convertDownloads = (
  download: NonNullable<StandardContentFragment["downloads"]>[number]
) => {
  if (!download?.file?.title || !download.file.mediaItemUrl) {
    return null;
  }

  return {
    title: download.file.title,
    href: download.file.mediaItemUrl,
    altText: download.file.altText,
  };
};

const getDownloads = (data: GetPageByUriQuery) => {
  if (!data.page?.pageACF?.standardContent) {
    return null;
  }

  const downloads = data.page.pageACF.standardContent.downloads
    ?.map(convertDownloads)
    .filter(Boolean);

  return downloads ?? null;
};

const getAdditionalData = (data: GetPageByUriQuery): AdditionalInfo | null => {
  const info = data.page?.pageACF?.standardContent?.additionalInfo;

  if (!info?.content || !info.title) {
    return null;
  }

  return {
    title: info.title,
    content: info.content,
  };
};

const getContactData = (data: GetPageByUriQuery): Contact | null => {
  const contact = data.page?.pageACF?.standardContent?.contact;

  if (!contact?.email || !contact.name) {
    return null;
  }

  return {
    name: contact.name,
    email: contact.email,
    website: contact.website,
    tel: contact.tel,
  };
};
