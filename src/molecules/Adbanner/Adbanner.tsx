import { Box } from "@chakra-ui/layout";
import React from "react";
import { navHeight, adBannerHeight } from "../../theme";

type AdbannerProps = {
  sponsors: Array<any>;
};

export const Adbanner: React.FC<AdbannerProps> = ({ ...rest }) => {
  return (
    <Box
      pos="fixed"
      top={{ base: navHeight.base, xl: 0 }}
      left="0"
      right="0"
      height={adBannerHeight}
      backgroundColor="brand.blue"
    >
      Adbanner
    </Box>
  );
};
