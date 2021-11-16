import { Box } from "@chakra-ui/layout";
import { graphql } from "gatsby";
import React from "react";
import { Heading } from "../atoms/Heading/Heading";
import { BlogPostList } from "../components/BlogPostList/BlogPostList";
import { BlogPostPreview } from "../components/BlogPostList/BlogPostPreview";
import { Layout } from "../components/Layout/Layout";
import { adBannerHeight, navHeight } from "../theme/misc";
import { GatsbyPageContext, Mutable, Post } from "../types";

const News: React.FC<{
  data: GatsbyTypes.GetAllBlogPostsQuery;
  pageContext: GatsbyPageContext;
}> = ({
  pageContext: { title, currentPage, pagesTotal, limit, categorySlug },
  data: { newestPosts, allPosts, seoData },
}) => {
  return (
    <Layout
      header={
        <>
          <Heading borders>{title}</Heading>
        </>
      }
      content={
        <BlogPostList
          posts={allPosts.nodes as Array<Post>}
          currentPageIndex={currentPage ?? 0}
          limit={limit ?? 6}
          pagesTotal={pagesTotal ?? 1}
        />
      }
      extra={
        <Box pos="sticky" top={{ md: navHeight.base, xl: adBannerHeight }}>
          <Heading size="lg" borders>
            News
          </Heading>
          <BlogPostPreview post={newestPosts.nodes[0]} />
        </Box>
      }
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const NewsQuery = graphql`
  query GetAllBlogPosts($skip: Int!, $limit: Int!, $categorySlug: String!) {
    ...NewestPosts
    allPosts: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { slug: { eq: $categorySlug } } } }
      }
      limit: $limit
      skip: $skip # filter: { #   categories: { nodes: { elemMatch: { id: { eq: $categoryId } } } } #   postACF: { postCategory: { ne: "flash" } } # }
    ) {
      nodes {
        ...BlogPostPreviewFields
      }
    }

    seoData: wpPage(id: { eq: "cG9zdDoxMw==" }) {
      ...Seo
    }
  }

  fragment BlogPostPreviewFields on WpPost {
    id
    title
    postACF {
      division
      postCategory
    }
    uri
    excerpt
    date
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 1000
              height: 240
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              transformOptions: { fit: COVER, cropFocus: ATTENTION }
            )
          }
        }
        altText
      }
    }
    categories {
      nodes {
        name
      }
    }
  }
`;

export default News;
