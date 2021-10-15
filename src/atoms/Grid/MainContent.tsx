import { GridItemProps, GridItem } from "@chakra-ui/layout";
import React from "react";

export const MainContent: React.FC<GridItemProps> = ({ ...rest }) => {
  return <GridItem colStart={{ base: 1, md: 3 }} colEnd={-1} {...rest} />;
};
