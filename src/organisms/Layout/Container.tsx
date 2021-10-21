import { Box } from "@chakra-ui/react";
import React from "react";
import { containerWidths, adBannerHeight } from "../../theme/misc";

export const Container: React.FC = (props) => {
  return (
    <Box
      mx="auto"
      width={containerWidths}
      marginBlockStart={{ base: 0, xl: adBannerHeight }}
      {...props}
    />
  );
};
