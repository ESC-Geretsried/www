import React from "react";
import { Layout } from "src/organisms/Layout";

const BlogPost: React.FC<{ post: GatsbyTypes.GetPostDataQuery["wpPost"] }> = ({
  post,
}) => {
  return (
    <Layout>
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />
    </Layout>
  );
};

export default BlogPost;
