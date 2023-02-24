"use client";

import { Portal } from "@zag-js/react";
import { ReactNode } from "react";
import { BurgerButton } from "../BurgerButton/BurgerButton";
import {
  Drawer,
  DrawerContainer,
  DrawerContent,
  DrawerTrigger,
} from "../Drawer/Drawer";
import { Navbar } from "../Navbar/Navbar";

const Trigger = () => {
  return (
    <DrawerTrigger as={<BurgerButton />} className="pointer-events-auto">
      Open Dialog
    </DrawerTrigger>
  );
};

export const MobileMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Drawer className="xl:hidden">
      <Navbar>
        <div>
          <Trigger />
        </div>
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
