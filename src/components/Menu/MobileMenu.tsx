import React from "react";
import { Menu } from "./Menu";
import { navHeight } from "../../theme/misc";
import { MenuItemType } from "../../types";
import { useStore } from "../../store/store";
import { SocialButtonGroup } from "../SocialButtonGroup/SocialButtonGroup";
import {
  DrawerProps,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
} from "@chakra-ui/react";

export const MobileMenu: React.FC<
  Omit<DrawerProps, "children" | "isOpen" | "onClose"> & {
    menuItems: Array<MenuItemType>;
  }
> = ({ finalFocusRef, menuItems, ...rest }) => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useStore();

  return (
    <Drawer
      isOpen={isMobileMenuOpen}
      placement="left"
      onClose={() => setIsMobileMenuOpen(false)}
      finalFocusRef={finalFocusRef}
      preserveScrollBarGap
      size="full"
      {...rest}
    >
      <DrawerOverlay mt={navHeight} />
      <DrawerContent bg="brand.blue" mt={navHeight}>
        <DrawerBody>
          <Menu menuItems={menuItems} />
          <SocialButtonGroup />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
