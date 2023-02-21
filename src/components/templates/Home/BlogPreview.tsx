import React from "react";
import { getBlogPreview } from "../../../lib/getBlogPreview";

export const BlogPreview = async () => {
  const blogPreview = await getBlogPreview();

  return (
    <section>
      <h2>News</h2>
      <ul>
        {blogPreview?.map((post) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ul>
    </section>
  );
};
