import Link from "next/link";
import React from "react";
import { getFlashPosts } from "../../../lib/getFlashPosts";

export const FlashPosts = async () => {
  const posts = await getFlashPosts();

  if (!posts) {
    return null;
  }

  return (
    <ul className="">
      {posts.map((post) => (
        <li key={post.title}>
          <Link href={post.uri}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};
