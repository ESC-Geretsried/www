import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../components/BlogPostList/BlogPostPreview";
import { Layout } from "../components/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Lineup: React.FC<{
  data: GatsbyTypes.GetLineupDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { newestPosts, lineupData, seoData }, pageContext }) => {
  return (
    <Layout
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    >
      {lineupData?.title}
    </Layout>
  );
};

export const LineupQuery = graphql`
  query GetLineupData($id: String!, $categorySlug: String!) {
    lineupData: wpPage(id: { eq: $id }) {
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

export default Lineup;
