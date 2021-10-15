import { Box } from "@chakra-ui/react";
import React from "react";

type WPContentProps = {
  content: string;
};

export const WPContent: React.FC<WPContentProps> = ({ content }) => {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: content }}
      width="100%"
      wordBreak="break-word"
      marginBlockEnd="3em"
      zIndex="base"
      sx={{
        ".gatsby-image-wrapper": {
          width: "100%",
          margin: { base: 0, md: "2rem" },
          img: {
            margin: { base: "1rem auto", md: 0 },
            maxWidth: "calc(100% - 4rem)",
          },
        },
        ".aligncenter": {
          margin: "2rem auto",
        },
        ".button": {
          textDecor: "none",
          margin: 0,
          padding: "0.25em 0.75em",
          width: "auto",
          overflow: "visible",
          background: "transparent",
          color: "inherit",
          font: "inherit",
          lineHeight: "normal",
          fontSmooth: "inherit",
          appearence: "none",
          border: "2px solid",
          borderColor: "brand.ice",
          borderRadius: 0,
          _hover: {
            background: "transparent",
            color: "brand.gold",
            borderColor: "brand.gold",
          },
        },
        iframe: {
          width: "100% !important",
        },
      }}
    />
  );
};
