import { isWithinInterval } from "date-fns";
import { FlashPostFragment } from "../../__generated__/cms-schema.codegen";
import { getCMSClient } from "../getCMSClient";

export type FlashPost = {
  title: string;
  excerpt: string;
  uri: string;
  start: Date;
  end: Date;
};

export const getFlashPosts = async () => {
  const client = getCMSClient();

  const result = await client.getFlashPosts();

  if (!result.posts?.nodes?.length) {
    return null;
  }

  return result.posts.nodes
    .filter(Boolean)
    .map(convertWPFlashPost)
    .filter(Boolean)
    .filter(flashPostInRange);
};

const flashPostInRange = (post: FlashPost) => {
  return isWithinInterval(new Date(), {
    start: new Date(post.start),
    end: new Date(post.end),
  });
};

const convertWPFlashPost = (node: FlashPostFragment): FlashPost | null => {
  if (!node.title || !node.uri || !node.excerpt) {
    return null;
  }
  if (!node.postACF?.flashPost?.start || !node.postACF.flashPost.end) {
    return null;
  }

  return {
    title: node.title,
    excerpt: node.excerpt,
    uri: node.uri,
    start: new Date(node.postACF.flashPost.start),
    end: new Date(node.postACF.flashPost.end),
  };
};
