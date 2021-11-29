import { ButtonGroup } from "@chakra-ui/button";
import {
  Box,
  BoxProps,
  Flex,
  List,
  ListItem,
  ListItemProps,
  ListProps,
} from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import { useLocation } from "@reach/router";
import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../atoms/Icons";
import { Post } from "../../types";
import { usePaginationLinks } from "../../utils/hooks";
import { HeadingLevelBoundary } from "../headings";
import { BlogPostPreview } from "./BlogPostPreview";
import { PaginationLink } from "./PaginationLink";

type BlogPostListProps = {
  posts: Array<Post>;
  currentPageIndex?: number;
  pagesTotal?: number;
  limit?: number;
};

const MotionList = motion<ListProps>(List);
const MotionListItem = motion<ListItemProps>(ListItem);

const list = {
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.5,
    },
  },
  initial: {
    transition: {
      when: "afterChildren",
    },
  },
  exit: {
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
      duration: 0.5,
    },
  },
};

const item = {
  animate: { opacity: 1, x: 0 },
  initial: { opacity: 0, x: -50 },
  exit: { opacity: 0, x: 50 },
};

export const BlogPostList: React.FC<BlogPostListProps & BoxProps> = memo(
  ({
    posts,
    currentPageIndex,
    pagesTotal,
    limit,

    ...rest
  }) => {
    const { pathname } = useLocation();
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const { urlBase, nextPageUrl, prevPageUrl } = useMemo(() => {
      const index = pathname.indexOf("/news");
      const urlBase = pathname.slice(0, index) + "/news/";

      if (currentPageIndex === undefined) {
        return { urlBase };
      }

      const prevPageUrl =
        currentPageIndex - 1 === 0
          ? urlBase
          : `${urlBase}${currentPageIndex - 1}/`;
      const nextPageUrl = `${urlBase}${currentPageIndex + 2}/`;

      return {
        urlBase,
        prevPageUrl,
        nextPageUrl,
      };
    }, [pathname, currentPageIndex]);

    const isFirstActive = currentPageIndex === 0;
    const isLastActive = currentPageIndex === pagesTotal;

    const links = usePaginationLinks({
      pagesTotal,
      currentPageIndex,
      urlBase,
      isMobile,
    });

    return (
      <HeadingLevelBoundary>
        <Box {...rest}>
          <AnimatePresence exitBeforeEnter>
            <MotionList
              initial="initial"
              animate="animate"
              exit="exit"
              variants={list}
              key={currentPageIndex}
            >
              {posts.map((post) => {
                return (
                  <MotionListItem
                    key={post.id}
                    variants={item}
                    borderBlockEnd="2px solid"
                    borderColor="brand.ice"
                    _last={{ border: "none" }}
                  >
                    <BlogPostPreview post={post} />
                  </MotionListItem>
                );
              })}
            </MotionList>
          </AnimatePresence>
          {pagesTotal && pagesTotal > 1 && (
            <Flex justifyContent="center">
              <ButtonGroup>
                <PaginationLink
                  to={prevPageUrl}
                  disabled={isFirstActive && "DisabledButton"}
                  display="flex"
                  alignItems="center"
                >
                  <ChevronLeftIcon />
                  <VisuallyHidden>Seite zurück</VisuallyHidden>
                </PaginationLink>
                {links?.map((link) => (
                  <PaginationLink key={link.to} {...link} />
                ))}
                <PaginationLink
                  to={nextPageUrl}
                  disabled={isLastActive && "DisabledButton"}
                  display="flex"
                  alignItems="center"
                >
                  <ChevronRightIcon />
                  <VisuallyHidden>Seite vor</VisuallyHidden>
                </PaginationLink>
              </ButtonGroup>
            </Flex>
          )}
        </Box>
      </HeadingLevelBoundary>
    );
  }
);
