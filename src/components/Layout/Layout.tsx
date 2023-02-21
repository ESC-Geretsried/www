"use client";

import { chakra, useMultiStyleConfig } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = useMultiStyleConfig("Layout");

  return <chakra.div __css={styles.container}>{children}</chakra.div>;
};

type SidebarProps = {
  children?: ReactNode;
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const styles = useMultiStyleConfig("Layout");

  return <chakra.aside __css={styles.sidebar}>{children}</chakra.aside>;
};

type MainProps = {
  children?: ReactNode;
};

export const Main: React.FC<MainProps> = ({ children }) => {
  const styles = useMultiStyleConfig("Layout");

  return <chakra.main __css={styles.main}>{children}</chakra.main>;
};
