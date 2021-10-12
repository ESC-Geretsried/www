import { useState } from "react";
import { containerWidths } from "../../theme";
import { MenuItemType } from "../../types";

export const prepareMenuData = (
  wpMenu: GatsbyTypes.GetMainMenuQuery["wpMenu"],
  pathname: Location["pathname"]
) => {
  if (wpMenu?.menuItems?.nodes) {
    return wpMenu?.menuItems?.nodes
      ?.filter(
        (menuItem) =>
          menuItem?.parentId === null &&
          menuItem?.url !== undefined &&
          menuItem?.id !== undefined &&
          menuItem?.label !== undefined
      )
      .map((menuItem) => {
        return {
          isActive: pathname.includes(menuItem?.url ?? ""),
          ...menuItem,
          childItems: menuItem?.childItems?.nodes?.map((childItem) => ({
            ...childItem,
            isActive: pathname.includes(childItem?.url ?? ""),
          })),
        } as MenuItemType;
      });
  }
  throw new Error("no Menu found");
};

export const useActiveMenuItems = (
  defaultOpen: Array<MenuItemType["id"]> | undefined
) => {
  const [activeMenuItems, setActiveMenuItems] = useState<
    Array<MenuItemType["id"]>
  >(defaultOpen ?? []);

  const toggleActiveMenuItems = (
    newItems: Array<string>,
    { allowMultiple }: { allowMultiple: boolean }
  ) => {
    if (activeMenuItems.some((activeItem) => newItems.includes(activeItem))) {
      if (allowMultiple) {
        setActiveMenuItems(
          activeMenuItems.filter((oldItem) => !newItems.includes(oldItem))
        );
      } else {
        setActiveMenuItems([]);
      }
    } else {
      if (allowMultiple) {
        setActiveMenuItems([...activeMenuItems, ...newItems]);
      } else {
        setActiveMenuItems([...newItems]);
      }
    }
  };

  return {
    activeMenuItems,
    setActiveMenuItems,
    toggleActiveMenuItems,
  };
};
