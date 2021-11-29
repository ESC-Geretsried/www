import { BoxProps, chakra } from "@chakra-ui/react";
import React from "react";

type WPContentProps = {
  content: string;
};

export const WPContent: React.FC<WPContentProps & BoxProps> = ({
  content,
  ...rest
}) => {
  return (
    <chakra.div
      dangerouslySetInnerHTML={{ __html: content }}
      width="100%"
      maxW="41rem"
      wordBreak="break-word"
      marginBlockEnd="3rem"
      mx={{ "2xl": "auto" }}
      zIndex="base"
      {...rest}
      sx={{
        "p:not(:last-of-type)": {
          paddingBlockEnd: 3,
        },
        ul: {
          paddingInlineStart: 5,
        },
        pre: {
          maxWidth: "100%",
          whiteSpace: "pre-wrap",
        },
        "h1, h2": {
          fontSize: "2rem",
          hyphens: "auto",
          marginBlockStart: 4,
          fontFamily: "Rubik",
          lineHeight: "shorter",
        },
        "h3, h4, h5": {
          fontSize: "1rem",
          hyphens: "auto",
          fontFamily: "Rubik",
          marginBlockStart: 4,
        },
        ".gatsby-image-wrapper": {
          margin: { base: 0, md: 6 },
        },
        ".aligncenter": {
          // width: "100%",
          // display: "flex",
          // justifyContent: "center",
          // marginBlock: 6,
          // mx: "auto",
        },
        ".button": {
          textDecor: "none",
          margin: 0,
          padding: "0.25rem 0.75rem",
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
        ".gallery": {
          display: "none",
        },
      }}
    />
  );
};
