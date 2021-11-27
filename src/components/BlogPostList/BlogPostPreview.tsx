import { Box, BoxProps, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { chakra, useMultiStyleConfig } from "@chakra-ui/system";
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

    const styles = useMultiStyleConfig("BlogPostPreview", {});

    return (
      <LinkBox role="group" sx={styles.linkBox} {...rest}>
        {image && (
          <chakra.div __css={styles.imgWrapper}>
            <DuotoneImg image={image} alt={altText ?? ""} />
          </chakra.div>
        )}
        <Hx fontSize="1rem">
          <LinkOverlay
            as={Link}
            to={`/${post.postACF?.division}/news${post.uri}`}
            sx={styles.link}
          >
            {post.title}
          </LinkOverlay>
        </Hx>
        <WPContent content={post.excerpt ?? ""} marginBlockEnd={0} mx={0} />
        <chakra.div __css={styles.tags}>
          <Tags tags={tags} />
          <Box>{dayjs(post.date).format("DD.MM.YYYY")}</Box>
        </chakra.div>
      </LinkBox>
    );
  }
);
