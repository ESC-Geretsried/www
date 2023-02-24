import Link from "next/link";
import React from "react";
import { getFlashPosts } from "../../../lib/getPost/getFlashPosts";

export const FlashPosts = async () => {
  const posts = await getFlashPosts();

  if (!posts) {
    return null;
  }

  return (
    <ul className="py-2 flex overflow-scroll relative snap-x snap-mandatory scroll-smooth">
      {posts.map((post, i) => (
        <li
          key={post.title}
          className="w-full snap-start flex justify-center"
          style={{ flex: "0 0 100%" }}
          id={`carusel-item-${i}`}
        >
          <Link href={post.uri}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};
