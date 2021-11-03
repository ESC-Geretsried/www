import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../organisms/BlogPostList/BlogPostPreview";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Hockey: React.FC<{
  data: GatsbyTypes.GetHockeyDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { newestPosts, seoData, hockeyData }, pageContext }) => {
  return (
    <Layout
      content={<>{hockeyData?.title}</>}
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const hockeyQuery = graphql`
  query GetHockeyData($id: String!, $categorySlug: String!) {
    hockeyData: wpPage(id: { eq: $id }) {
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

export default Hockey;
