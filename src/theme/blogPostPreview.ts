import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const BlogPostPreview: ComponentMultiStyleConfig = {
  parts: ["linkBox", "imgWrapper", "link", "tags"],
  baseStyle: {
    linkBox: {
      py: 6,
      transition: "transform 0.2s",
      _hover: {
        transform: "scale(1.01)",
      },
    },
    imgWrapper: {
      paddingBlockEnd: 2,
    },
    link: {
      fontStyle: "normal",
      backgroundImage: "none",
      _hover: {
        backgroundImage: "none",
      },
    },
    tags: {
      display: "flex",
      justifyContent: "space-between",
      paddingBlockStart: 2,
    },
  },
};
