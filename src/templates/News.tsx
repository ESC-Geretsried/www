import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const News: React.FC<{
  data: GatsbyTypes.GetAllBlogPostsQuery;
  pageContext: GatsbyPageContext;
}> = ({ pageContext, data }) => {
  console.log(data);
  return <Layout content={<>{pageContext.title}</>} extra={<>extra</>} />;
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
        title
        postACF {
          division
          postCategory
        }
        excerpt
        date
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid {
                  src
                }
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
    }
  }
`;

export default News;
