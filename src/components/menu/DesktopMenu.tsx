"use client";

import { chakra, useMultiStyleConfig } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type DesktopMenuProps = {
  children?: ReactNode;
};

export const DesktopMenu: React.FC<DesktopMenuProps> = ({
  children,
  ...rest
}) => {
  const styles = useMultiStyleConfig("Menu");

  return <chakra.div __css={styles.desktop}>{children}</chakra.div>;
};
