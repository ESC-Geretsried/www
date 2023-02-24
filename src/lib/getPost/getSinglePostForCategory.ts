import { GetPostByCategoryDatabaseIdQuery } from "../../__generated__/cms-schema.codegen";
import { getCMSClient } from "../getCMSClient";
import { PostPreview } from "./types";

export const getSinglePostForCategory = async (databaseId: number) => {
  const client = getCMSClient();

  const data = await client.getPostByCategoryDatabaseId({ databaseId });

  if (!data.posts?.nodes?.[0]) {
    return null;
  }

  return getPostPreview(data);
};

const getPostPreview = (
  data: GetPostByCategoryDatabaseIdQuery
): PostPreview | null => {
  if (!data.posts?.nodes?.length) {
    return null;
  }
  const post = data.posts.nodes[0];

  if (!post?.title || !post?.excerpt || !post.uri) {
    return null;
  }

  return {
    title: post.title,
    excerpt: post.excerpt,
    uri: post.uri,
    categories: [],
  };
};
