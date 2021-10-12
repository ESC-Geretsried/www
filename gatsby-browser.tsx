import React from "react";
import { AnimatePresence } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./src/theme";

import "@fontsource/rubik/900.css";
import "@fontsource/pt-sans/400.css";

export const wrapPageElement = ({ element }) => (
  <ChakraProvider theme={theme}>
    <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
  </ChakraProvider>
);
