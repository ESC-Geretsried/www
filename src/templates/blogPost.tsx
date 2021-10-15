import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";

const BlogPost: React.FC<{ post: GatsbyTypes.GetPostDataQuery["wpPost"] }> = ({
  post,
}) => {
  return (
    <Layout>
      <h1>{post?.title}</h1>
    </Layout>
  );
};

export const BlogPostQuery = graphql`
  query GetPostData($id: String!) {
    wpPost(id: { eq: $id }) {
      title
    }
  }
`;

export default BlogPost;
