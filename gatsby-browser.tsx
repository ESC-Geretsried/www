import React from "react";
import { Root } from "./src/Root";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { theme } from "./src/theme/theme";
import "@fontsource/rubik/900.css";
import "@fontsource/pt-sans/400.css";

export const wrapPageElement = ({ element, props }) => (
  <ChakraProvider theme={theme}>
    <Root pageContext={props.pageContext}>
      <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
    </Root>
  </ChakraProvider>
);
