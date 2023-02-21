"use client";

import React, { ReactNode, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useMultiStyleConfig,
  chakra,
} from "@chakra-ui/react";
import { Navbar } from "../Navbar/Navbar";

type MobileMenuProps = {
  children: ReactNode;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const styles = useMultiStyleConfig("Menu");

  return (
    <chakra.div __css={styles.mobile}>
      <Navbar onClick={onToggle} buttonRef={buttonRef} />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={buttonRef}
        placement="left"
      >
        <DrawerContent>
          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </chakra.div>
  );
};
