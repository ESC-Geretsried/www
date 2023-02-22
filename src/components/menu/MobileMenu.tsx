"use client";

import { Portal } from "@zag-js/react";
import { ReactNode } from "react";
import {
  Drawer,
  DrawerContainer,
  DrawerContent,
  DrawerTrigger,
} from "../Drawer/Drawer";
import { Navbar } from "../Navbar/Navbar";

export const MobileMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Drawer>
      <Navbar>
        <DrawerTrigger className="p-2 pointer-events-auto">
          Open Dialog
        </DrawerTrigger>
      </Navbar>
      <Portal>
        <DrawerContainer>
          <DrawerContent className="mt-navbar bg-slate-400">
            {children}
          </DrawerContent>
        </DrawerContainer>
      </Portal>
    </Drawer>
  );
};
