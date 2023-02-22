import React, { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-main md:gap-8 mx-auto max-w-7xl px-4 ">
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
  return <main className="mt-navbar">{children}</main>;
};
