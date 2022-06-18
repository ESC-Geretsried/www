import { isWithinInterval, parseISO } from "date-fns";
import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";
import { PostsPreviewQuery } from "../../../graphql-types";
import BlogPostList from "../blogPostPreview/BlogPostList";
import H1 from "../h1/H1";

const BlogPreview = () => {
  const postPreviewData = useStaticQuery<PostsPreviewQuery>(graphql`
    query PostsPreview {
      allWordpressPost(limit: 5) {
        nodes {
          ...BlogPostPreviewFields
        }
      }
    }
  `);

  const posts = useMemo(
    () =>
      postPreviewData.allWordpressPost.nodes
        .filter(
          (post) =>
            post?.postACF?.postCategory !== "flash" ||
            isWithinInterval(new Date(), {
              start: new Date(post.postACF?.flashPost?.start ?? ""),
              end: new Date(post.postACF?.flashPost?.end ?? ""),
            }),
        )
        .slice(0, 5)
        .sort((a, b) => {
          const aTime = parseISO(a.date);
          const bTime = parseISO(b.date);

          return bTime.getTime() - aTime.getTime();
        }),
    [postPreviewData],
  );

  return (
    <>
      <H1 title="Aktuelles" size="section" />
      <BlogPostList posts={posts} />
    </>
  );
};

export default BlogPreview;
