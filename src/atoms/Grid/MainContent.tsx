import { GridItemProps, GridItem } from "@chakra-ui/layout";
import React from "react";

export const MainContent: React.FC<GridItemProps & { fullWidth?: boolean }> = ({
  fullWidth,
  ...rest
}) => {
  return (
    <GridItem
      colStart={{ base: 1, md: fullWidth ? 1 : 3 }}
      colEnd={-1}
      display="grid"
      gridTemplateColumns={{
        base: "1fr",
        md: fullWidth ? "repeat(8, 1fr)" : "1fr",
      }}
      gridGap={6}
      {...rest}
    />
  );
};
