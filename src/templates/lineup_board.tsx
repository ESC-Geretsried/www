import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../components/BlogPostList/BlogPostPreview";
import { Layout } from "../components/Layout/Layout";
import { GatsbyPageContext } from "../types";

const LineupBoard: React.FC<{
  data: GatsbyTypes.GetLineupBoardDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { newestPosts, seoData }, pageContext }) => {
  return (
    <Layout
      content={<>Lineup</>}
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const LineupBoardQuery = graphql`
  query GetLineupBoardData($id: String!, $categorySlug: String!) {
    wpPage(id: { eq: $id }) {
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

export default LineupBoard;
