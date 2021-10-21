import { Box, Flex, Heading, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import React from "react";
import { Link } from "../../atoms/Link";
import { WPContent } from "../../atoms/WPContent/WPContent";
import { Post } from "../../templates/news";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { DuotoneImg } from "../../atoms/DuotoneImg/DuotoneImg";

type BlogPostPreviewProps = {
  post: Post;
};

export const BlogPostPreview: React.FC<BlogPostPreviewProps> = ({ post }) => {
  let image, altText;
  if (post.featuredImage?.node?.localFile) {
    image = getImage(post.featuredImage.node.localFile as ImageDataLike);
    altText = post.featuredImage.node.altText;
  }

  return (
    <LinkBox
      py={8}
      role="group"
      transition="transform 0.2s"
      _hover={{
        transform: "scale(1.01)",
      }}
    >
      {image && (
        <Box paddingBlockEnd={2}>
          <DuotoneImg image={image} alt={altText ?? ""} />
        </Box>
      )}
      <Heading as="h2" fontSize="1rem">
        <LinkOverlay
          as={Link}
          to={`/${post.postACF?.division}/news${post.uri}`}
        >
          {post.title}
        </LinkOverlay>
      </Heading>
      <WPContent content={post.excerpt ?? ""} marginBlockEnd="0" />
      <Flex justifyContent="space-between">
        <Box>
          {post.categories?.nodes?.map((category) => category?.name).join(", ")}
        </Box>
        <Box>{post.date}</Box>
      </Flex>
    </LinkBox>
  );
};
