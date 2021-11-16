import React from "react";
import { Root } from "./Root";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { theme } from "./theme/theme";
import "@fontsource/rubik/900.css";
import "@fontsource/pt-sans/400.css";
import {
  WrapPageElementBrowserArgs,
  WrapPageElementNodeArgs,
  WrapRootElementBrowserArgs,
  WrapRootElementNodeArgs,
} from "gatsby";
import { GatsbyPageContext } from "./types";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const wrapPageElement = ({
  element,
  props,
}:
  | WrapPageElementBrowserArgs<any, GatsbyPageContext>
  | WrapPageElementNodeArgs<any, GatsbyPageContext>) => (
  <Root pageContext={props.pageContext}>
    {/* <AnimatePresence exitBeforeEnter> */}
    {element}
    {/* </AnimatePresence> */}
  </Root>
);

export const wrapRootElement = ({
  element,
}: WrapRootElementBrowserArgs | WrapRootElementNodeArgs) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>{element}</ChakraProvider>
  </QueryClientProvider>
);
