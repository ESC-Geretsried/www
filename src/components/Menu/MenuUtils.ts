import { useStore } from "../../store/store";
import { MenuItemType } from "../../types";

export const prepareMenuData = (
  wpMenu:
    | GatsbyTypes.GetMainMenuQuery["wpMenu"]
    | GatsbyTypes.GetFooterMenuQuery["wpMenu"]
) => {
  const { pathname } = useStore.getState();
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
