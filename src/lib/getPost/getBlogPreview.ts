import { GetBlogPreviewQuery } from "../../__generated__/cms-schema.codegen";
import { getCMSClient } from "../getCMSClient";
import { PostPreview } from "./types";

export const getBlogPreview = async () => {
  const client = getCMSClient();
  const blogPreview = await client.getBlogPreview();

  if (!blogPreview.posts?.nodes) {
    return null;
  }

  return blogPreview.posts.nodes
    .filter(Boolean)
    .map(convertNodesToBlogPostPreview)
    .filter(Boolean);
};

type WPPostPreview = NonNullable<
  NonNullable<NonNullable<GetBlogPreviewQuery["posts"]>["nodes"]>[number]
>;

const convertNodesToBlogPostPreview = (
  node: WPPostPreview
): PostPreview | null => {
  if (!node.title || !node.excerpt || !node.uri) {
    return null;
  }

  return {
    title: node.title,
    excerpt: node.excerpt,
    uri: node.uri,
    categories: [],
  };
};
