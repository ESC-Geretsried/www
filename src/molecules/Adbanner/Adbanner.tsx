import { Box, BoxProps } from "@chakra-ui/layout";
import React from "react";
import { navHeight, adBannerHeight } from "../../theme/misc";

type AdbannerProps = {
  sponsors: Array<any>;
};

export const Adbanner: React.FC<AdbannerProps & BoxProps> = ({ ...rest }) => {
  return (
    <Box
      pos={{ base: "relative", xl: "fixed" }}
      top={{ base: "inherit", xl: 0 }}
      zIndex={{ base: "auto", xl: "banner" }}
      left={{ xl: 0 }}
      right={{ xl: 0 }}
      gridColumn="1/-1"
      height={adBannerHeight}
      backgroundColor="brand.blue"
      {...rest}
    >
      Adbanner
    </Box>
  );
};
