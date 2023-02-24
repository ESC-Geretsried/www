import React, { ReactNode } from "react";
import { getMenus } from "../../lib/getMenus";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-main md:gap-8 mx-auto max-w-7xl px-4 ">
      {children}
    </div>
  );
};

type SidebarProps = {
  children?: ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <nav>{children}</nav>;
};

type MainProps = {
  children?: ReactNode;
};

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main id="main" className="mt-navbar xl:mt-0 pb-4 border-b-2">
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
    <footer className="col-start-2 ">
      {menus.footer.map((item) => item.label)}
    </footer>
  );
};
