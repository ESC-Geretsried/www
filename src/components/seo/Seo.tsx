import * as React from "react";
import { Helmet } from "react-helmet";
import { Wordpress_Page_Pageacf_Seo } from "../../../graphql-types";

const Seo: React.FC<{ title: string; uri: string; seo: Wordpress_Page_Pageacf_Seo }> = ({ seo, title, uri }) => {
  const { metaDescription, noIndex, ogDescription, socialImage, twitterDescription } = seo;
  const url = `www.esc-geretsried.de${uri}`;

  return (
    <Helmet title={`ESC Geretsried - ${title}`}>
      {metaDescription && <meta name="description" content={metaDescription} />}

      <meta property="og:title" content={title} />
      {ogDescription && <meta property="og:description" content={ogDescription} />}

      <meta property="twitter:title" content={title} />
      {twitterDescription && <meta property="twitter:description" content={twitterDescription} />}

      {url && <meta property="og:url" content={url} />}

      {/* {socialImage && <meta property="og:image" content={socialImage.url} />}

      {socialImage && <meta name="twitter:image" content={socialImage.url} />} */}

      {noIndex && <meta name="robots" content="noindex" />}
      <html lang="de" />
    </Helmet>
  );
};

export default Seo;
