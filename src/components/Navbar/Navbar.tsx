import React, { ReactNode } from "react";

type NavbarProps = {
  children?: ReactNode;
};

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <header className="fixed top-0 left-0 right-0  w-full bg-blue h-navbar flex justify-between items-center z-10 ">
      {children}
    </header>
  );
};
