import { graphql } from "gatsby";

export const Seo = graphql`
  fragment Seo on WpPage {
    pageACF {
      seo {
        ...SeoFields
      }
    }
  }
`;

export const SeoFields = graphql`
  fragment SeoFields on WpPage_Pageacf_Seo {
    metaDescription
    noIndex
    ogDescription
    socialImage {
      localFile {
        url
      }
    }
    title
    twitterDescription
  }
`;
