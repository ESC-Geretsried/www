import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
} from "@chakra-ui/modal";
import { Menu } from "../../molecules/Menu/Menu";
import { navHeight } from "../../theme";
import { MenuItemType } from "../../types";

export const MobileMenu: React.FC<
  Omit<DrawerProps, "children"> & { menuItems: Array<MenuItemType> }
> = ({ isOpen, onClose, finalFocusRef, menuItems, ...rest }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      preserveScrollBarGap
      {...rest}
    >
      <DrawerOverlay mt={navHeight} />
      <DrawerContent bg="brand.blue" mt={navHeight}>
        <DrawerBody>
          <Menu
            menuItems={menuItems}
            isNavigationDelayed
            onClick={(e) => {
              // at route navigation, trigger on close before navigation starts
              // links inside Menu have a delayed navigation
              if ((e.target as HTMLElement).tagName === "A") {
                onClose();
              }
            }}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
