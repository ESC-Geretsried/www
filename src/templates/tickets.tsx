import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../components/BlogPostList/BlogPostPreview";
import { Layout } from "../components/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Tickets: React.FC<{
  data: GatsbyTypes.GetTicketsDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { newestPosts, ticketsData, seoData }, pageContext }) => {
  return (
    <Layout
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    >
      {ticketsData?.title}
    </Layout>
  );
};

export const TicketsQuery = graphql`
  query GetTicketsData($id: String!, $categorySlug: String!) {
    ticketsData: wpPage(id: { eq: $id }) {
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

export default Tickets;
