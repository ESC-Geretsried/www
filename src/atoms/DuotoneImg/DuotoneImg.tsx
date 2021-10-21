import { Box } from "@chakra-ui/layout";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";
import React from "react";

export const DuotoneImg: React.FC<GatsbyImageProps> = (props) => {
  return (
    <Box position="relative">
      <Box>
        <GatsbyImage {...props} />
      </Box>
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        filter={`url("#duotone")`}
        transition="opacity 0.2s"
        _hover={{
          opacity: 0,
        }}
        _groupHover={{
          opacity: 0,
        }}
      >
        <GatsbyImage {...props} />
      </Box>
    </Box>
  );
};
