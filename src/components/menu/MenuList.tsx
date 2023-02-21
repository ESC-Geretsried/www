"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React from "react";
import { Menu } from "../../lib/getMenus";
import { VisuallyHiddenUntilFocusedButton } from "../VisuallyHiddenUntilFocused";

type MenuListProps = {
  menu: Menu;
};

export const MenuList: React.FC<MenuListProps> = ({ menu, ...rest }) => {
  const styles = useMultiStyleConfig("MenuList");

  return (
    <Accordion as="ul" variant="menu" allowToggle>
      {menu.items.map((item) => (
        <AccordionItem as="li" key={item.label}>
          {item.childItems?.length ? (
            <>
              <AccordionButton>{item.label}</AccordionButton>
              <AccordionPanel>
                <chakra.ul __css={styles.submenu}>
                  {item.childItems.map((childItem) => {
                    return (
                      <chakra.li key={childItem.href}>
                        <Link href={childItem.href} sx={styles.submenuItem}>
                          {childItem.label}
                        </Link>
                      </chakra.li>
                    );
                  })}
                </chakra.ul>
              </AccordionPanel>
            </>
          ) : (
            <Link href={item.href} sx={styles.item}>
              {item.label}
            </Link>
          )}
        </AccordionItem>
      ))}
      <VisuallyHiddenUntilFocusedButton type="button">
        close menu
      </VisuallyHiddenUntilFocusedButton>
    </Accordion>
  );
};
