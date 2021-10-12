import React from "react";
import {
  ListItem,
  List,
  Button,
  Collapse,
  ChakraProps,
  ListProps,
} from "@chakra-ui/react";
import { MenuItem } from "../../atoms/MenuItem";
import { useActiveMenuItems } from "./MenuUtils";
import { MenuItemType } from "../../types";
import { line } from "../../theme";

export const Menu: React.FC<
  {
    menuItems: Array<MenuItemType>;
    isNavigationDelayed?: boolean;
  } & ListProps
> = ({ menuItems, isNavigationDelayed = false, ...rest }) => {
  const activeItem = menuItems
    .filter((menuItem) => menuItem.childItems.length !== 0)
    .find((menuItem) => menuItem.isActive);

  const { activeMenuItems, toggleActiveMenuItems } = useActiveMenuItems(
    activeItem?.id ? [activeItem.id] : []
  );

  return (
    <List borderBlock={line} {...rest}>
      {menuItems.map((menuItem) => {
        if (menuItem.childItems.length === 0) {
          return (
            <ListItem key={menuItem.id}>
              <MenuItem
                {...menuItem}
                isNavigationDelayed={isNavigationDelayed}
              />
            </ListItem>
          );
        }
        return (
          <ListItem key={menuItem.id}>
            <Button
              onClick={() =>
                toggleActiveMenuItems([menuItem.id], { allowMultiple: false })
              }
              fontFamily="Rubik"
              fontStyle="italic"
              fontWeight="bold"
              bg="none"
              px="0"
              display="block"
              width="100%"
              textAlign="left"
              _focus={{ boxShadow: "none" }}
              _focusVisible={{ textDecoration: "underline" }}
              _hover={{ textDecoration: "none", color: "brand.gold" }}
              _active={{ bg: "transparent" }}
            >
              {menuItem.label}
            </Button>

            <Collapse in={activeMenuItems.includes(menuItem.id)} animateOpacity>
              <List>
                {menuItem.childItems.map((childItem) => (
                  <ListItem key={childItem.id}>
                    <MenuItem
                      {...childItem}
                      isChildItem
                      isNavigationDelayed={isNavigationDelayed}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </ListItem>
        );
      })}
    </List>
  );
};
