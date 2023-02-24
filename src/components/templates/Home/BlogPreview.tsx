import React from "react";
import { getBlogPreview } from "../../../lib/getPost/getBlogPreview";
import { PostPreview } from "../../PostPreview/PostPreview";

export const BlogPreview = async () => {
  const blogPreview = await getBlogPreview();

  return (
    <section>
      <h2>News</h2>
      <ul className="stack">
        {blogPreview?.map((post) => (
          <li key={post.title}>
            {/* @ts-expect-error Server Component */}
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
};
