import { chakra } from "@chakra-ui/system";
import { graphql } from "gatsby";
import React from "react";
import { Heading } from "../atoms/Heading/Heading";
import { WPContent } from "../atoms/WPContent/WPContent";
import { Extra } from "../components/Extra/Extra";
import { Layout } from "../components/Layout/Layout";

const BlogPost: React.FC<{ data: GatsbyTypes.GetPostDataQuery }> = ({
  data: { post },
}) => {
  return (
    <Layout
      extra={<Extra post={{}} />}
      header={<Heading>{post?.title}</Heading>}
      seo={{
        metaDescription: "Blog post meta description",
        title: post?.title,
        twitterDescription: "",
        ogDescription: "",
        noIndex: false,
        socialImage: { localFile: { url: "" } },
      }}
    >
      <chakra.div maxW="41rem">
        <WPContent content={post?.content ?? ""} />
      </chakra.div>
    </Layout>
  );
};

export const BlogPostQuery = graphql`
  query GetPostData($id: String!) {
    post: wpPost(id: { eq: $id }) {
      title
      content
    }
    # seo: wpPost(id: { eq: $id }) {
    #   ...SeoFields
    # }
  }
`;

export default BlogPost;
