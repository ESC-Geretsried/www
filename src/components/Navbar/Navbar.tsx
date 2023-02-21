"use client";

import { useSize } from "@chakra-ui/react-use-size";
import { Button, chakra, useMultiStyleConfig } from "@chakra-ui/react";
import React, { ReactNode, useRef } from "react";

type NavbarProps = {
  children?: ReactNode;
  buttonRef: React.RefObject<HTMLButtonElement>;
  onClick: () => void;
};

const useNavbarHeightAsCSSProperty = () => {
  const ref = useRef<HTMLElement>(null);
  const dimensions = useSize(ref, true);

  if (dimensions) {
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${dimensions.height}px`
    );
  }

  return ref;
};

export const Navbar: React.FC<NavbarProps> = ({
  onClick,
  buttonRef,
  children,
}) => {
  const styles = useMultiStyleConfig("Navbar");

  const ref = useNavbarHeightAsCSSProperty();

  return (
    <chakra.header __css={styles.container} ref={ref}>
      {children}
      {/* <Button onClick={onClick} ref={buttonRef}>
        Burger
      </Button> */}
    </chakra.header>
  );
};
