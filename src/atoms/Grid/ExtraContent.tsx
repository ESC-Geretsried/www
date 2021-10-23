import { GridItemProps, GridItem } from "@chakra-ui/layout";
import React from "react";

export const ExtraContent: React.FC<GridItemProps> = ({ ...rest }) => {
  return <GridItem colStart={1} colEnd={{ base: -1, md: 4 }} {...rest} />;
};
