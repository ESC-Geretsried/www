import { GridItemProps, GridItem } from "@chakra-ui/layout";
import React from "react";

export const MainContent: React.FC<GridItemProps & { fullWidth?: boolean }> = ({
  fullWidth,
  ...rest
}) => {
  return (
    <GridItem
      colStart={{ base: 1, xl: fullWidth ? 1 : 4 }}
      colEnd={-1}
      display="grid"
      sx={{
        "& > *": {
          maxW: "41rem",
          mx: "auto",
        },
      }}
      gridTemplateColumns={{
        base: "1fr",
        md: fullWidth ? "repeat(8, 1fr)" : "1fr",
      }}
      gridGap={{ base: 2, md: 6, "2xl": 12 }}
      {...rest}
    />
  );
};
