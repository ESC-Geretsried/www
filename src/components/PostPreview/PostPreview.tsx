import Link from "next/link";
import type { PostPreview as PostPreviewType } from "../../lib/getPost/types";
import { BorderHeading } from "../Heading/BorderHeading";
import { HeadingLevelBoundary, Hx } from "../Heading/Heading";
import { HTML } from "../HTML/HTML";
import { Section } from "../Section";

type SingleBlogPostPreviewProps = {
  post: PostPreviewType;
};

export const PostPreview = ({ post }: SingleBlogPostPreviewProps) => {
  return (
    <HeadingLevelBoundary>
      <Section>
        <BorderHeading className="text-2xl">News</BorderHeading>
        <Link href={post.uri} className="no-underline group">
          <Hx className="group-hover:underline">{post.title}</Hx>
          <HTML>{post.excerpt}</HTML>
        </Link>
      </Section>
    </HeadingLevelBoundary>
  );
};
