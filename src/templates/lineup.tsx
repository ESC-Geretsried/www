import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../organisms/BlogPostList/BlogPostPreview";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Lineup: React.FC<{
  data: GatsbyTypes.GetLineupDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { newestPosts, lineupData, seoData }, pageContext }) => {
  return (
    <Layout
      content={<>{lineupData?.title}</>}
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
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
