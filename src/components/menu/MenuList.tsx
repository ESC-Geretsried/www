"use client";

import React from "react";
import { Menu } from "../../lib/getMenus";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion/Accordion";
import { useDrawerOptionalContext } from "../Drawer/Drawer";
import { VisuallyHiddenUntilFocusedButton } from "../VisuallyHiddenUntilFocused";
import { MenuLink } from "./MenuLink";

type MenuListProps = {
  menu: Menu;
  id: string;
};

export const MenuList: React.FC<MenuListProps> = ({ menu, id, ...rest }) => {
  const menuContext = useDrawerOptionalContext();

  return (
    <>
      <Accordion id={id} collapsible className="font-rubik italic border-y-2">
        <AccordionItem value="Home">
          <MenuLink href="/" className="w-full py-2">
            Home
          </MenuLink>
        </AccordionItem>
        {menu.map((item) => {
          return (
            <AccordionItem value={item.label} key={item.label}>
              {item.childItems?.length ? (
                <>
                  <AccordionTrigger className="italic py-2 w-full text-left hover:underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol>
                      <li>
                        <MenuLink
                          href={`${item.href}news`}
                          className="pl-4 py-1 font-sans"
                        >
                          News
                        </MenuLink>
                      </li>
                      {item.childItems.map((childItem) => {
                        return (
                          <li key={childItem.label}>
                            <MenuLink
                              href={childItem.href}
                              className="pl-4 py-1 font-sans"
                            >
                              {childItem.label}
                            </MenuLink>
                          </li>
                        );
                      })}
                    </ol>
                  </AccordionContent>
                </>
              ) : (
                <MenuLink href={item.href} className="py-2">
                  {item.label}
                </MenuLink>
              )}
            </AccordionItem>
          );
        })}
        <AccordionItem value="close">
          <VisuallyHiddenUntilFocusedButton
            className="md:hidden w-full py-2"
            onClick={() => menuContext?.api.close()}
          >
            Close Menu
          </VisuallyHiddenUntilFocusedButton>
        </AccordionItem>
      </Accordion>
    </>
  );
};
