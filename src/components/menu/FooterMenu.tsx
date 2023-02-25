import { Route } from "next";
import Link from "next/link";
import React from "react";
import { Item, ItemWithChildren } from "../../lib/getMenus";
import { HeadingLevelBoundary, Hx } from "../Heading/Heading";

type FooterMenuProps = {
  menu: Record<string, Array<Item | ItemWithChildren>>;
};

const FooterLink: React.FC<{ href: Route; children: string }> = ({
  href,
  children,
}) => {
  return (
    <Link
      href={href}
      className="inline-block no-underline hover:underline w-full py-1"
    >
      {children}
    </Link>
  );
};

const FooterLinkList: React.FC<{ links: Array<Item> }> = ({ links }) => {
  return (
    <ul>
      {links.map((item) => (
        <li key={item.href} className="w-full">
          <FooterLink href={item.href}>{item.label}</FooterLink>
        </li>
      ))}
    </ul>
  );
};

export const FooterMenu: React.FC<FooterMenuProps> = ({ menu }) => {
  return (
    <HeadingLevelBoundary>
      <nav className="grid grid-cols-2 md:grid-cols-5 gap-4 ">
        <div>
          <Hx>Verein</Hx>
          <FooterLinkList links={menu.verein} />
        </div>
        <div>
          <Hx>River Rats</Hx>
          <FooterLinkList links={menu.riverrats} />
        </div>
        <div>
          <Hx>Eishockey</Hx>
          <FooterLinkList links={menu.eishockey} />
        </div>
        <FooterLinkList links={menu.rest} />
        <FooterLinkList links={menu.legal} />
      </nav>
    </HeadingLevelBoundary>
  );
};
