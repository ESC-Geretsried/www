"use client";

import React, { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { VisuallyHiddenUntilFocusedButton } from "../VisuallyHiddenUntilFocused";
import { Menu } from "../../lib/getMenus";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useAccordionContext,
  useAccordionItemContext,
} from "../Accordion/Accordion";
import { useDrawerContext } from "../Drawer/Drawer";

type MenuListProps = {
  menu: Menu;
};

const MenuLink: React.FC<
  { children: ReactNode; className?: string } & LinkProps
> = ({ href, children, ...rest }) => {
  const { api } = useAccordionContext();
  const { value } = useAccordionItemContext();
  const menuContext = useDrawerContext();

  const { onClick: onClose, ...props } = api.getTriggerProps({ value });

  return (
    <Link
      href={href}
      onClick={() => {
        menuContext.api.close();
        onClose();
      }}
      {...props}
      className="py-2 inline-block w-full no-underline hover:underline"
      {...rest}
    >
      {children}
    </Link>
  );
};

export const MenuList: React.FC<MenuListProps> = ({ menu, ...rest }) => {
  const menuContext = useDrawerContext();

  return (
    <Accordion id="menu" collapsible className="font-rubik italic">
      {menu.items.map((item) => {
        return (
          <AccordionItem value={item.label} key={item.label}>
            {item.childItems?.length ? (
              <>
                <AccordionTrigger className="italic py-2 w-full text-left hover:underline hover:opacity-70">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent>
                  <ol>
                    {item.childItems.map((childItem) => {
                      return (
                        <li key={childItem.label}>
                          <MenuLink
                            href={childItem.href}
                            className="pl-4 py-1  inline-block font-sans italic w-full no-underline hover:underline hover:opacity-70"
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
              <MenuLink href={item.href}>{item.label}</MenuLink>
            )}
          </AccordionItem>
        );
      })}
      <AccordionItem value="close">
        <VisuallyHiddenUntilFocusedButton
          onClick={() => menuContext.api.close()}
        >
          Close Menu
        </VisuallyHiddenUntilFocusedButton>
      </AccordionItem>
    </Accordion>
  );
};
