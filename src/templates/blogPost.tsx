import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";

const BlogPost: React.FC<{ data: GatsbyTypes.GetPostDataQuery }> = ({
  data: { post },
}) => {
  return (
    <Layout
      content={<>{post?.title}</>}
      extra={<>extra</>}
      header={<>header</>}
      seo={{
        metaDescription: "Blog post meta description",
        title: post?.title,
        twitterDescription: "",
        ogDescription: "",
        noIndex: false,
        socialImage: { localFile: { url: "" } },
      }}
    />
  );
};

export const BlogPostQuery = graphql`
  query GetPostData($id: String!) {
    post: wpPost(id: { eq: $id }) {
      title
    }
    # seo: wpPost(id: { eq: $id }) {
    #   ...SeoFields
    # }
  }
`;

export default BlogPost;
