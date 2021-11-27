import { Box } from "@chakra-ui/layout";
import { graphql } from "gatsby";
import React from "react";
import { Heading } from "../atoms/Heading/Heading";
import { BlogPostList } from "../components/BlogPostList/BlogPostList";
import { Calendar } from "../components/Calendar/Calendar";
import { Layout } from "../components/Layout/Layout";
import { GatsbyPageContext, Mutable } from "../types";
import { Post } from "../types";

const Home: React.FC<{
  data: GatsbyTypes.GetHomeDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { homeData, seoData, postsData }, pageContext }) => {
  return (
    <Layout
      header={<Heading borders>{homeData?.title}</Heading>}
      seo={seoData?.pageACF?.seo}
    >
      <Box
        gridColumn={{ base: "1/-1", lg: "1 / 5" }}
        gridRow={{ base: 2, lg: 1 }}
      >
        <Heading borders>News</Heading>
        <BlogPostList posts={(postsData?.nodes ?? []) as Array<Post>} />
      </Box>
      <Box gridColumn={{ base: "1/-1", lg: "5 / -1" }} gridRow={1}>
        <Heading borders>Termine</Heading>
        <Calendar pt={4} />
      </Box>
    </Layout>
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
