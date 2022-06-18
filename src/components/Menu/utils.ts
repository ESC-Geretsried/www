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

export const prepareFooterMenuData = (
  wpMenu:
    | GatsbyTypes.GetMainMenuQuery["wpMenu"]
    | GatsbyTypes.GetFooterMenuQuery["wpMenu"]
) => {
  return prepareMenuData(wpMenu).reduce<{
    [key: string]: Array<
      GatsbyTypes.MenuItemFragment | GatsbyTypes.MenuChildItemFragment
    >;
  }>(
    (acc, item) => {
      if (["Verein"].includes(item.label ?? "")) {
        acc.Verein.push(...item.childItems);
        return acc;
      }

      if (item.label === "Werde Mitglied") {
        acc.Verein.push(item);
        return acc;
      }

      if (["River Rats"].includes(item.label ?? "")) {
        acc["River Rats"].push(...item.childItems);

        return acc;
      }

      if (["Eishockey"].includes(item.label ?? "")) {
        acc.Eishockey.push(...item.childItems);

        return acc;
      }

      if (["Datenschutzerklärung", "Impressum"].includes(item.label ?? "")) {
        acc.legal.push(item);

        return acc;
      }

      acc["misc"].push(item);

      return acc;
    },
    { Verein: [], "River Rats": [], Eishockey: [], misc: [], legal: [] }
  );
};
