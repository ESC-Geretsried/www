import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";
import { Menu } from "./Menu";
import { MenuItemType } from "../../types";
import { SocialButtonGroup } from "../SocialButtonGroup/SocialButtonGroup";
import Logo from "../../assets/logo-small.svg";

export const DesktopMenu: React.FC<
  { menuItems: Array<MenuItemType> } & ChakraProps
> = ({ menuItems, ...rest }) => {
  return (
    <Box {...rest}>
      <Logo />
      <Menu menuItems={menuItems} />
      <SocialButtonGroup />
    </Box>
  );
};
