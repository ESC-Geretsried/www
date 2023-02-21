import { GetMenusQuery } from "../__generated__/cms-schema.codegen";
import { getCMSClient } from "./getCMSClient";
import { truthy } from "./utils";

export type Item = { label: string; href: string };
export type ItemWithChildren = Item & {
  childItems?: Array<Item> | null;
};

export type Menu = { id: string; name: string; items: Array<ItemWithChildren> };

export const getMenus = async () => {
  const client = getCMSClient();

  const menusResult = await client.getMenus();

  if (!menusResult.menus?.nodes) {
    return null;
  }

  const menus = menusResult.menus.nodes
    .map(convertWPMenuToProps)
    .filter(truthy);

  const main = menus.find((menu) => menu.id === "dGVybToy");
  const footer = menus.find((menu) => menu.id === "dGVybToyMA==");

  return {
    main,
    footer,
  };
};

type WPMenu = NonNullable<NonNullable<GetMenusQuery["menus"]>["nodes"]>[number];

export const convertWPMenuToProps = (menu: WPMenu) => {
  if (!menu?.menuItems?.nodes || !menu.name) {
    return null;
  }

  const menuItems = menu.menuItems.nodes.filter(truthy);

  return {
    id: menu.id,
    name: menu.name,
    items: menuItems
      // NOTE: filter out items without a parentId, they will be copied in the childItems
      .filter((item) => item.parentId === null)
      .map((item) => {
        if (!item.label || !item.uri) {
          return null;
        }

        const childItems = item.childItems?.nodes
          ?.map((childItem) => {
            if (!childItem?.label || !childItem.uri) {
              return null;
            }

            return { label: childItem.label, href: childItem.uri };
          })
          .filter(truthy);

        return {
          label: item.label,
          href: item.uri,
          childItems:
            childItems?.length !== undefined && childItems.length > 0
              ? childItems
              : null,
        };
      })
      .filter(truthy),
  };
};
