import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../components/BlogPostList/BlogPostPreview";
import { Layout } from "../components/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Sponsors: React.FC<{
  data: GatsbyTypes.GetSponsorsDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { newestPosts, sponsorsData, seoData }, pageContext }) => {
  return (
    <Layout
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    >
      {sponsorsData?.title}
    </Layout>
  );
};

export const SponsorsQuery = graphql`
  query GetSponsorsData($id: String!, $categorySlug: String!) {
    sponsorsData: wpPage(id: { eq: $id }) {
      title
    }

    defaultData: wpPage(id: { eq: $id }) {
      ...DefaultPageDataFields
    }

    ...NewestPosts

    seoData: wpPage(id: { eq: $id }) {
      ...Seo
    }
  }
`;

export default Sponsors;
