"use client";

import React, { ReactNode } from "react";

type DesktopMenuProps = {
  children?: ReactNode;
};

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ children }) => {
  return <div className="hidden md:block">{children}</div>;
};
