import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { Menu } from "../../molecules/Menu/Menu";
import { MenuItemType } from "../../types";

export const DesktopMenu: React.FC<
  { menuItems: Array<MenuItemType> } & ChakraProps
> = ({ menuItems, ...rest }) => {
  return (
    <Box {...rest}>
      <Box>Logo</Box>
      <Menu menuItems={menuItems} />
      <Box>social</Box>
    </Box>
  );
};
