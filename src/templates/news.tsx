import { graphql } from "gatsby";
import React from "react";
import { Heading } from "../atoms/Heading/Heading";
import { BlogPostList } from "../organisms/BlogPostList/BlogPostList";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext, Mutable, Post } from "../types";

const News: React.FC<{
  data: GatsbyTypes.GetAllBlogPostsQuery;
  pageContext: GatsbyPageContext;
}> = ({ pageContext, data: { allPosts, seoData } }) => {
  return (
    <Layout
      header={
        <>
          <Heading borders>{pageContext.title}</Heading>
        </>
      }
      content={<BlogPostList posts={allPosts.nodes as Array<Post>} />}
      extra={<>extra</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const NewsQuery = graphql`
  query GetAllBlogPosts($categoryId: String!) {
    allPosts: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { id: { eq: $categoryId } } } }
        postACF: { postCategory: { ne: "flash" } }
      }
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
