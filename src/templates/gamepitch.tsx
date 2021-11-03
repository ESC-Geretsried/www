import { Box } from "@chakra-ui/react";
import { graphql } from "gatsby";
import React from "react";
import { BlogPostPreview } from "../organisms/BlogPostList/BlogPostPreview";
import { Layout } from "../organisms/Layout/Layout";

const Gamepitch: React.FC<{ data: GatsbyTypes.GetGamepitchDataQuery }> = ({
  data: { newestPosts, gamepitchData, defaultData, seoData },
}) => {
  return (
    <Layout
      content={
        <>
          Gamepitch<Box>{JSON.stringify(gamepitchData)}</Box>
        </>
      }
      extra={<BlogPostPreview post={newestPosts.nodes[0]} />}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
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
