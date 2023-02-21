import React from "react";
import { css } from "@emotion/react";
import BaseSection from "../sections/BaseSection";
import H1 from "../h1/H1";
import BlogPostPreview from "./BlogPostPreview";
import { BlogPostPreviewFieldsFragment, BlogPostFieldsFragment } from "../../../graphql-types";
import BlogPostList from "./BlogPostList";
import { mq } from "../../styles/variables";

const BlogPostListContainer: React.FC<{ posts: Array<BlogPostPreviewFieldsFragment> }> = ({ posts, ...rest }) => {
  return (
    <>
      {posts.length > 1 && (
        <BaseSection size="small">
          <H1 size="section" title="Neuster Post" />
          <BlogPostPreview post={[...posts].shift() as BlogPostFieldsFragment} />
        </BaseSection>
      )}
      <BaseSection
        size="big"
        css={
          posts.length === 1 &&
          css`
            grid-column: 1 / -1 !important;
            ${mq[4]} {
              grid-column: 3 / span 6 !important;
            }
          `
        }
      >
        <BlogPostList posts={posts.length === 1 ? posts : [...posts].slice(1)} />
      </BaseSection>
    </>
  );
};

export default BlogPostListContainer;
