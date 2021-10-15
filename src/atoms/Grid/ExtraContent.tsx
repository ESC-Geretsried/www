import { GridItemProps, GridItem } from "@chakra-ui/layout";
import React from "react";

export const ExtraContent: React.FC<GridItemProps> = ({ ...rest }) => {
  return <GridItem colStart={1} colend={{ base: -1, md: 2 }} {...rest} />;
};
