import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/pt-sans/400.css";
import "@fontsource/rubik/900.css";
import { WrapRootElementBrowserArgs, WrapRootElementNodeArgs } from "gatsby";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme/theme";

const queryClient = new QueryClient();

export const wrapRootElement = ({
  element,
}: WrapRootElementBrowserArgs | WrapRootElementNodeArgs) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>{element}</ChakraProvider>
  </QueryClientProvider>
);
