import React from "react";
import { css } from "@emotion/react";
import { BlogPostPreviewFieldsFragment, Wordpress_Category } from "../../../graphql-types";
import TypedImg from "../img/Img";
import DuoToneWrapper from "../duotoneImg/DuoToneImg";
import {
  PostPreviewTitle,
  PostPreviewExcerpt,
  ReadMoreLink,
  PostPreviewFooter,
  PostPreviewWrapper,
} from "./BlogPost.styles";

const BlogPostPreview: React.FC<{ post: BlogPostPreviewFieldsFragment; size?: "small" | "big" }> = ({
  post,
  size = "big",
  ...rest
}) => {
  return (
    <PostPreviewWrapper size={size} {...rest}>
      {post.featuredImage !== null && size === "big" && (
        <DuoToneWrapper
          css={css`
            margin-bottom: 1rem;
          `}
        >
          <TypedImg fluid={post.featuredImage?.node?.localFile?.childImageSharp?.fluid} />
        </DuoToneWrapper>
      )}
      <PostPreviewTitle dangerouslySetInnerHTML={{ __html: post.title ?? "" }} />
      <PostPreviewExcerpt dangerouslySetInnerHTML={{ __html: post.excerpt ?? "" }} />
      {size === "big" && (
        <PostPreviewFooter>
          <strong>
            {post.categories?.nodes
              ?.slice(0, 3)
              .map((node) => node?.name)
              .join(", ")}
            {(post.categories?.nodes as Array<Wordpress_Category>).length > 3 && ", ..."}
          </strong>
          <span>{new Date(post.date ?? "").toLocaleDateString(["de-DE"])}</span>
        </PostPreviewFooter>
      )}
      <ReadMoreLink href={`/${post.postACF?.division}/news${post.uri}`}>mehr lesen</ReadMoreLink>
    </PostPreviewWrapper>
  );
};

export default BlogPostPreview;
