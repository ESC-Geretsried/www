import { Grid, GridProps } from "@chakra-ui/layout";
import React from "react";
import { containerWidths, adBannerHeight, navHeight } from "../../theme/misc";

export const ContentGrid: React.FC<GridProps> = ({ children, ...rest }) => {
  return (
    <Grid
      mx="auto"
      width={containerWidths}
      marginBlockStart={{ base: navHeight.base, xl: adBannerHeight }}
      templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(12, 1fr)" }}
      gridGap={{ base: 2, md: 6, "2xl": 12 }}
      alignItems="baseline"
      {...rest}
    >
      {children}
    </Grid>
  );
};
