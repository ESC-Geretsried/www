import { Box } from "@chakra-ui/react";
import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../components/BlogPostList/BlogPostPreview";
import { Layout } from "../components/Layout/Layout";

const Gamepitch: React.FC<{ data: GatsbyTypes.GetGamepitchDataQuery }> = ({
  data: { newestPosts, gamepitchData, defaultData, seoData },
}) => {
  return (
    <Layout
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    >
      <Box>{JSON.stringify(gamepitchData)}</Box>
    </Layout>
  );
};

export const StandardQuery = graphql`
  query GetGamepitchData($id: String!, $categorySlug: String!) {
    gamepitchData: wpPage(id: { eq: $id }) {
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

export default Gamepitch;
