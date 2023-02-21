"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraBaseProvider, ColorModeScript } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { theme } from "../theme/theme";

type ProvidersProps = {
  children?: ReactNode;
};

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
    </CacheProvider>
  );
};
