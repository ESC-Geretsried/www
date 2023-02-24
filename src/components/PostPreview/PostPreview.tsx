import Link from "next/link";
import React, { ReactNode } from "react";
import { HTML } from "../HTML/HTML";
import type { PostPreview as PostPreviewType } from "../../lib/getPost/types";

type SingleBlogPostPreviewProps = {
  post: PostPreviewType;
};

export const PostPreview = async ({ post }: SingleBlogPostPreviewProps) => {
  return (
    <Link href={post.uri} className="no-underline">
      <h2>{post.title}</h2>
      <HTML>{post.excerpt}</HTML>
    </Link>
  );
};
