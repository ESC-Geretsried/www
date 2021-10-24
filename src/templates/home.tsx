import { Box } from "@chakra-ui/layout";
import { graphql } from "gatsby";
import React from "react";
import { Heading } from "../atoms/Heading/Heading";
import { BlogPostList } from "../organisms/BlogPostList/BlogPostList";
import { Calender } from "../organisms/Calender/Calender";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext, Mutable } from "../types";
import { Post } from "../types";

const Home: React.FC<{
  data: GatsbyTypes.GetHomeDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { homeData, seoData, postsData }, pageContext }) => {
  return (
    <Layout
      content={
        <>
          <Box gridColumn="1 / 5">
            <BlogPostList posts={(postsData?.nodes ?? []) as Array<Post>} />
          </Box>
          <Box gridColumn="5 / -1" paddingBlockStart={6}>
            <Calender />
          </Box>
        </>
      }
      header={
        <Heading as="h1" borders>
          {homeData?.title}
        </Heading>
      }
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const HomeQuery = graphql`
  query GetHomeData($id: String!) {
    homeData: wpPage(id: { eq: $id }) {
      title
    }
    postsData: allWpPost(limit: 6) {
      nodes {
        ...BlogPostPreviewFields
      }
    }
    seoData: wpPage(id: { eq: $id }) {
      ...Seo
    }
  }
`;

export default Home;
