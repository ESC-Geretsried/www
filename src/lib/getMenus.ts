import { Route } from "next";
import { MenuItemFragment } from "../__generated__/cms-schema.codegen";
import { getCMSClient } from "./getCMSClient";
import { NonNullableProperties } from "./types";

export type Item = Omit<
  NonNullableProperties<MenuItemFragment>, // NOTE: make everything required
  "__typename" | "uri" | "parentId" // NOTE: omit properties we don't need
> & { href: Route }; // NOTE: rename uri to href for better dx later

export type ItemWithChildren = Item & {
  childItems?: Array<Item> | null;
};

export type Menu = Array<ItemWithChildren>;

const byOrder = (a: { order: number }, b: { order: number }) => {
  return a.order - b.order;
};

export const getMenus = async () => {
  const client = getCMSClient();

  const menusResult = await client.getMenus();

  if (
    !menusResult.mainMenu?.menuItems?.nodes ||
    !menusResult.footerMenu?.menuItems?.nodes
  ) {
    return null;
  }

  const main = menusResult.mainMenu.menuItems.nodes
    .reduce(wpMenuToMenu, [])
    .sort(byOrder);

  const footerItems = menusResult.footerMenu.menuItems.nodes.reduce(
    wpMenuToMenu,
    []
  );

  const footer = getFooterMenu(footerItems);

  return {
    main,
    footer,
  };
};
// NOTE: stupid wordpress doesn't nest custom links as childItems, we have to manually construct a list of items with childItems
export const wpMenuToMenu = (prev: Menu, curr: MenuItemFragment | null) => {
  if (!curr?.label || !curr.order || !curr.uri) {
    return prev;
  }

  const itemWithChildren = prev.find((item) => item.id === curr.parentId);

  if (itemWithChildren) {
    if (Array.isArray(itemWithChildren.childItems)) {
      itemWithChildren.childItems.push({
        id: curr.id,
        label: curr.label,
        order: curr.order,
        href: curr.uri as Route,
      });

      return prev;
    }

    itemWithChildren.childItems = [
      {
        id: curr.id,
        label: curr.label,
        order: curr.order,
        href: curr.uri as Route,
      },
    ];

    return prev;
  }

  prev.push({
    id: curr.id,
    label: curr.label,
    order: curr.order,
    href: curr.uri as Route,
    childItems: null,
  });

  return prev;
};

const getFooterMenu = (items: Array<ItemWithChildren>) => {
  const verein = items.find((item) => item.label === "Verein");
  const riverrats = items.find((item) => item.label === "River Rats");
  const eishockey = items.find((item) => item.label === "Eishockey");

  if (!verein?.childItems || !riverrats?.childItems || !eishockey?.childItems) {
    return null;
  }

  const rest = items.filter(
    (item) =>
      ![
        "Verein",
        "River Rats",
        "Eishockey",
        "Impressum",
        "Datenschutzerklärung",
      ].includes(item.label)
  );
  const legal = items.filter((item) =>
    ["Impressum", "Datenschutzerklärung"].includes(item.label)
  );

  return {
    verein: verein.childItems.sort(byOrder),
    riverrats: riverrats.childItems.sort(byOrder),
    eishockey: eishockey.childItems.sort(byOrder),
    rest: rest.sort(byOrder),
    legal,
  };
};
