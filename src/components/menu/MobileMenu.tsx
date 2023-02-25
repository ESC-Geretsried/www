"use client";

import { Portal } from "@zag-js/react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { BurgerButton } from "../BurgerButton/BurgerButton";
import {
  Drawer,
  DrawerContainer,
  DrawerContent,
  DrawerTrigger,
} from "../Drawer/Drawer";
import { Hx } from "../Heading/Heading";
import { Navbar } from "../Navbar/Navbar";
import logo from "../../../public/logo_cropped.svg";

const Trigger = () => {
  return (
    <DrawerTrigger as={<BurgerButton />} className="pointer-events-auto">
      Open Dialog
    </DrawerTrigger>
  );
};

export const MobileMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Drawer className="xl:hidden ">
      <Navbar>
        <Trigger />
        <Hx className="block ">Title</Hx>
        <Link href="/" className="hover:opacity-100 block mr-4">
          <Image
            alt="Logo vom ESC Geretsried"
            src={logo}
            className="max-h-16 max-w-[4rem]"
          />
        </Link>
      </Navbar>
      <Portal>
        <DrawerContainer>
          <DrawerContent className="mt-navbar bg-blue px-4 py-8">
            {children}
          </DrawerContent>
        </DrawerContainer>
      </Portal>
    </Drawer>
  );
};
