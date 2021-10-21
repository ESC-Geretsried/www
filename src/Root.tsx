import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useStore } from "./store/store";
import { GatsbyPageContext } from "./types";

type RootProps = {
  pageContext: GatsbyPageContext;
};
const blue = { r: 34, g: 53, b: 80 };
const gold = { r: 168 + 80, g: 129 + 80, b: 59 + 80 };

export const Root: React.FC<RootProps> = ({ pageContext, children }) => {
  const { setSiteTitle, setPathname } = useStore();
  useEffect(() => {
    setSiteTitle(pageContext.title);
    setPathname(pageContext.pathname);
  }, [pageContext]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          height: 0,
          width: 0,
          overflow: "hidden",
          visibility: "hidden",
          position: "absolute",
        }}
      >
        <filter id="duotone">
          <feColorMatrix
            type="matrix"
            result="grayscale"
            values="1 0 0 0 0
        1 0 0 0 0
        1 0 0 0 0
        0 0 0 1 0"
          />
          <feComponentTransfer
            colorInterpolationFilters="sRGB"
            result="duotone"
          >
            <feFuncR
              type="table"
              tableValues={`${blue.r / 255} ${gold.r / 255}`}
            />
            <feFuncG
              type="table"
              tableValues={`${blue.g / 255} ${gold.g / 255}`}
            />
            <feFuncB
              type="table"
              tableValues={`${blue.b / 255} ${gold.b / 255}`}
            />
            <feFuncA type="table" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </svg>
      <Box overflow="hidden">{children}</Box>
    </>
  );
};
