import { ButtonGroup, IconButton } from "@chakra-ui/button";
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
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../atoms/Icons";
import { Post } from "../../types";
import {
  useClientSidePagination,
  usePaginationButtons,
} from "../../utils/hooks";
import { BlogPostPreview } from "./BlogPostPreview";
import { PaginationButton } from "./PaginationButton";

type BlogPostListProps = {
  posts: Array<Post>;
};

const PAGESIZE = 6;

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

export const BlogPostList: React.FC<BlogPostListProps & BoxProps> = ({
  posts,
  ...rest
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const {
    chunks,
    currentPageIndex,
    isFirstActive,
    isLastActive,
    currentPage,
    previous,
    setCurrentPageIndex,
    next,
  } = useClientSidePagination<Post>(posts, { pageSize: PAGESIZE, isMobile });

  const buttons = usePaginationButtons({
    chunkLength: chunks.length,
    currentPageIndex,
    setCurrentPageIndex,
    isMobile,
  });

  return (
    <Box {...rest}>
      <AnimatePresence exitBeforeEnter>
        <MotionList
          initial="initial"
          animate="animate"
          exit="exit"
          variants={list}
          key={currentPageIndex}
        >
          {currentPage.map((post) => {
            return (
              <MotionListItem
                key={post.id}
                variants={item}
                borderBlockEnd="2px solid "
                borderColor="brand.ice"
                _last={{ border: "none" }}
              >
                <BlogPostPreview post={post} />
              </MotionListItem>
            );
          })}
        </MotionList>
      </AnimatePresence>
      {buttons && (
        <Flex justifyContent="center">
          <ButtonGroup>
            <IconButton
              aria-label="previous Page"
              onClick={previous}
              icon={<ChevronLeftIcon />}
              disabled={isFirstActive}
            />
            {buttons.map((button, i) => (
              <PaginationButton name={button.key} {...button} />
            ))}
            <IconButton
              aria-label="next Page"
              onClick={next}
              icon={<ChevronRightIcon />}
              disabled={isLastActive}
            />
          </ButtonGroup>
        </Flex>
      )}
    </Box>
  );
};
