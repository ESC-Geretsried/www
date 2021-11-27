import * as React from "react";
import { Helmet } from "react-helmet";

export const Seo: React.FC<{
  title: string;
  uri: string;
  seo?: GatsbyTypes.SeoFieldsFragment;
}> = ({ seo, title, uri }) => {
  const {
    metaDescription,
    noIndex,
    ogDescription,
    socialImage,
    twitterDescription,
  } = seo ?? {};
  const url = `www.esc-geretsried.de${uri}`;

  const description =
    metaDescription ?? ogDescription ?? twitterDescription ?? "";

  return (
    <Helmet title={`ESC Geretsried - ${title}`}>
      <html lang="de" />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={ogDescription ?? metaDescription ?? twitterDescription ?? ""}
      />

      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content={twitterDescription ?? ogDescription ?? metaDescription ?? ""}
      />

      {url && <meta property="og:url" content={url} />}

      {socialImage && (
        <meta property="og:image" content={socialImage.localFile?.url} />
      )}

      {socialImage && (
        <meta name="twitter:image" content={socialImage.localFile?.url} />
      )}

      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
};
