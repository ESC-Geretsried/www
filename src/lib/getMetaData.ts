import type { Metadata } from "next/types";
import { parse } from "node-html-parser";
import { getCMSClient } from "./getCMSClient";
import faviconData from "../../favicon.data.json";

export const getMetaData = async ({
  page,
  division,
}: {
  page: string;
  division?: string;
}): Promise<Metadata> => {
  const isHome = !division && !page;

  const uri = (isHome ? "home" : division) + (page ? `/${page}` : "");
  const client = getCMSClient();

  const favicons = getFaviconData();
  const manifest = getManifest();
  const pageSeo = await client.getPageSeoByUri({
    uri,
  });

  if (!pageSeo.page) {
    return {
      icons: favicons,
      manifest,
      title: "ESC Geretsried",
    };
  }

  const seo = pageSeo.page.pageACF?.seo;

  return {
    icons: favicons,
    manifest,
    title: isHome ? "Home | ESC Geretsried" : pageSeo.page.title,
    description: seo?.metaDescription,
    themeColor: "#223550",
    openGraph: {
      title: pageSeo.page.title ?? undefined,
      description: seo?.ogDescription ?? seo?.metaDescription ?? undefined,
      url: `https://www.esc-geretsried.de/${isHome ? "" : uri}`,
      locale: "de-DE",
      type: "website",
    },
    twitter: {
      description: seo?.twitterDescription ?? seo?.metaDescription ?? undefined,
    },
    robots: {
      index: !seo?.noIndex,
    },
  };
};

const getFaviconData = () => {
  const html = parse(faviconData.favicon.html_code);
  const links = html.querySelectorAll("link");

  const icon = links
    .filter((link) => link.attributes.rel === "icon")
    .map((link) => link.attributes)
    .map(({ href, ...icon }) => ({ url: href, ...icon }));

  const appleTouch = links
    .filter((link) => link.attributes.rel === "apple-touch-icon")
    .map((link) => link.attributes)
    .map(({ href, ...icon }) => ({ url: href, ...icon }));

  return {
    icon,
    shortcut: icon[0].url,
    other: [...appleTouch],
  };
};

const getManifest = () => {
  const html = parse(faviconData.favicon.html_code);
  const links = html.querySelectorAll("link");

  const manifest = links.find((link) => link.attributes.rel === "manifest");

  if (!manifest) {
    return null;
  }

  return manifest.attributes.href;
};
