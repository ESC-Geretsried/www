import React, { ReactNode } from "react";
import { getMenus } from "../../lib/getMenus";
import { FooterMenu } from "../Menu/FooterMenu";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-0 xl:grid-cols-main md:gap-8 mx-auto px-4 max-w-7xl ">
      {children}
    </div>
  );
};

type SidebarProps = {
  children?: ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <nav className="">{children}</nav>;
};

type MainProps = {
  children?: ReactNode;
};

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main id="main" className="mt-navbar  xl:mt-0 pb-4 border-b-2">
      {children}
    </main>
  );
};

export const Footer = async () => {
  const menus = await getMenus();

  if (!menus?.footer) {
    return null;
  }

  return (
    <footer className="xl:col-start-2">
      <FooterMenu menu={menus.footer} />
    </footer>
  );
};
