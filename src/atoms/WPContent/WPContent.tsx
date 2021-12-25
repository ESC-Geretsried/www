import { BoxProps, chakra } from "@chakra-ui/react";
import React, { memo } from "react";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from "html-react-parser";
import { HeadingLevelBoundary, Hx } from "../../components/headings";

const options: HTMLReactParserOptions = {
  trim: true,
  replace: (domNode) => {
    if (domNode instanceof Element) {
      if (domNode.name.match(/h\d/gi)) {
        return (
          <Hx size={domNode.name}>{domToReact(domNode.children, options)}</Hx>
        );
      }

      if (domNode.attribs.class?.includes("gatsby-image-wrapper")) {
        const { style, class: className } = domNode.attribs;
        delete domNode.attribs.style;
        delete domNode.attribs.class;

        return (
          <chakra.div
            display="flex"
            flexDir="column"
            sx={{
              ".aligncenter": {
                alignSelf: "center",
              },
              ".size-full": {
                width: "100%",
              },
            }}
          >
            <chakra.div className={className} css={style} {...domNode.attribs}>
              {domToReact(domNode.children, options)}
            </chakra.div>
          </chakra.div>
        );
      }
    }
    return domNode;
  },
};

type WPContentProps = {
  content: string;
};

export const WPContent: React.FC<WPContentProps & BoxProps> = memo(
  ({ content, ...rest }) => {
    return (
      <HeadingLevelBoundary>
        <chakra.div
          // dangerouslySetInnerHTML={{ __html: content }}
          width="100%"
          maxW="41rem"
          wordBreak="break-word"
          marginBlockEnd="3rem"
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
            // "h1, h2": {
            //   fontSize: "2rem",
            //   hyphens: "auto",
            //   marginBlockStart: 4,
            //   fontFamily: "Rubik",
            //   lineHeight: "shorter",
            // },
            // "h3, h4, h5": {
            //   fontSize: "1rem",
            //   hyphens: "auto",
            //   fontFamily: "Rubik",
            //   marginBlockStart: 4,
            // },
            // ".gatsby-image-wrapper": {
            //   display: "flex !important",
            //   flexDirection: "column",
            //   width: "100%",
            //   "&.aligncenter div": {
            //     alignSelf: "center",
            //     position: "relative",
            //   },
            //   "&.size-full div": {
            //     width: "100%",
            //   },
            // },

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
        >
          {parse(content, options)}
        </chakra.div>
      </HeadingLevelBoundary>
    );
  }
);
