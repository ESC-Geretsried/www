import { graphql } from "gatsby";
import React from "react";
import { Heading } from "../atoms/Heading/Heading";
import { BlogPostList } from "../organisms/BlogPostList/BlogPostList";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext, Mutable, Post } from "../types";

const News: React.FC<{
  data: GatsbyTypes.GetAllBlogPostsQuery;
  pageContext: GatsbyPageContext;
}> = ({
  pageContext: { title, currentPage, pagesTotal, limit },
  data: { allPosts, seoData },
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
      extra={<>extra</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const NewsQuery = graphql`
  query GetAllBlogPosts($skip: Int!, $limit: Int!) {
    allPosts: allWpPost(
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
