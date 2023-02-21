import { GetBlogPreviewQuery } from "../__generated__/cms-schema.codegen";
import { getCMSClient } from "./getCMSClient";
import { truthy } from "./utils";

type BlogPostPreview = {
  title: string;
  excerpt: string;
  categories: Array<string>;
};

export const getBlogPreview = async () => {
  const client = getCMSClient();
  const blogPreview = await client.getBlogPreview();

  if (!blogPreview.posts?.nodes) {
    return null;
  }

  return blogPreview.posts.nodes
    .filter(truthy)
    .map(convertNodesToBlogPostPreview)
    .filter(truthy);
};

type WPPostPreview = NonNullable<
  NonNullable<NonNullable<GetBlogPreviewQuery["posts"]>["nodes"]>[number]
>;

const convertNodesToBlogPostPreview = (
  node: WPPostPreview
): BlogPostPreview | null => {
  if (!node.title || !node.excerpt) {
    return null;
  }

  return {
    title: node.title,
    excerpt: node.excerpt,
    categories: [],
  };
};
