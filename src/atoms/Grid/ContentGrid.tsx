import { Grid, GridProps } from "@chakra-ui/layout";
import React from "react";

type ContentGridProps = {};

export const ContentGrid: React.FC<ContentGridProps & GridProps> = ({
  children,
  ...rest
}) => {
  return (
    <Grid
      templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(10, 1fr)" }}
      gridGap={{ base: 2, md: 6, "2xl": 12 }}
      {...rest}
    >
      {children}
    </Grid>
  );
};
