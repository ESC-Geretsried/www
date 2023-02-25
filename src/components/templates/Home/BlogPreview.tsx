import React from "react";
import { getBlogPreview } from "../../../lib/getPost/getBlogPreview";
import { BorderHeading } from "../../Heading/BorderHeading";
import { PostPreview } from "../../PostPreview/PostPreview";
import { Section } from "../../Section";

export const BlogPreview = async () => {
  const blogPreview = await getBlogPreview();

  return (
    <Section>
      <BorderHeading>Aktuelles</BorderHeading>
      <ul className="stack">
        {blogPreview?.map((post) => (
          <li key={post.title} className="pb-4 [&:not(:last-child)]:border-b-2">
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </Section>
  );
};
