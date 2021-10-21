import React, { useEffect } from "react";
import { ListItem, List, Button, Collapse, ListProps } from "@chakra-ui/react";
import { MenuItem } from "./MenuItem";
// import { useActiveMenuItems } from "./MenuUtils";
import { MenuItemType } from "../../types";
import { lineBlock } from "../../theme/misc";
import { useStore } from "../../store/store";

export const Menu: React.FC<
  {
    menuItems: Array<MenuItemType>;
  } & ListProps
> = ({ menuItems, ...rest }) => {
  const { activeMenuItems, setActiveMenuItems, toggleActiveMenuItems } =
    useStore();

  useEffect(() => {
    const activeItem = menuItems
      .filter((menuItem) => menuItem.childItems.length !== 0)
      .find((menuItem) => menuItem.isActive);

    setActiveMenuItems(activeItem ? [activeItem.id] : []);
  }, [menuItems]);

  return (
    <List sx={lineBlock} {...rest}>
      <ListItem>
        <MenuItem id="home" label="Home" url="/" isActive={false} />
      </ListItem>
      {menuItems.map((menuItem) => {
        if (menuItem.childItems.length === 0) {
          return (
            <ListItem key={menuItem.id}>
              <MenuItem {...menuItem} />
            </ListItem>
          );
        }
        return (
          <ListItem key={menuItem.id}>
            <Button
              onClick={() =>
                toggleActiveMenuItems([menuItem.id], { allowMultiple: false })
              }
              variant="MenuButton"
            >
              {menuItem.label}
            </Button>

            <Collapse in={activeMenuItems.includes(menuItem.id)} animateOpacity>
              <List>
                <ListItem>
                  <MenuItem
                    id={`/${menuItem.url}news/`}
                    label="News"
                    url={`/${menuItem.url}news/`}
                    isActive={false}
                    isChildItem
                  />
                </ListItem>
                {menuItem.childItems.map((childItem) => (
                  <ListItem key={childItem.id}>
                    <MenuItem {...childItem} isChildItem />
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
