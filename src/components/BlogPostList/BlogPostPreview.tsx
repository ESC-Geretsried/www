import {
  Box,
  Flex,
  Heading,
  Stack,
  LinkBox,
  LinkOverlay,
  BoxProps,
} from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/react";
import dayjs from "dayjs";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import React, { memo, useMemo } from "react";
import { DuotoneImg } from "../../atoms/DuotoneImg/DuotoneImg";
import { Link } from "../../atoms/Link";
import { WPContent } from "../../atoms/WPContent/WPContent";
import { Post } from "../../types";
import { Hx } from "../headings";
import { Tags } from "./Tags";

type BlogPostPreviewProps = {
  post: Post;
} & BoxProps;

export const BlogPostPreview: React.FC<BlogPostPreviewProps> = memo(
  ({ post, ...rest }) => {
    let image, altText;
    if (post.featuredImage?.node?.localFile) {
      image = getImage(post.featuredImage.node.localFile as ImageDataLike);
      altText = post.featuredImage.node.altText;
    }

    const tags = useMemo(
      () => post.categories?.nodes?.map((node) => node?.name),
      [post]
    );

    return (
      <LinkBox
        py={8}
        role="group"
        transition="transform 0.2s"
        _hover={{
          transform: "scale(1.01)",
        }}
        {...rest}
      >
        {image && (
          <Box paddingBlockEnd={2}>
            <DuotoneImg image={image} alt={altText ?? ""} />
          </Box>
        )}
        <Hx fontSize="1rem">
          <LinkOverlay
            as={Link}
            to={`/${post.postACF?.division}/news${post.uri}`}
            fontStyle="normal"
            backgroundImage="none"
            _hover={{
              backgroundImage: "none",
            }}
          >
            {post.title}
          </LinkOverlay>
        </Hx>
        <WPContent content={post.excerpt ?? ""} marginBlockEnd={0} mx={0} />
        <Flex justifyContent="space-between" paddingBlockStart={2}>
          <Tags tags={tags} />
          <Box>{dayjs(post.date).format("DD.MM.YYYY")}</Box>
        </Flex>
      </LinkBox>
    );
  }
);
