import "@fontsource/pt-sans/400.css";
import "@fontsource/rubik/900.css";
import { AnimatePresence } from "framer-motion";
import { WrapPageElementBrowserArgs, WrapPageElementNodeArgs } from "gatsby";
import React from "react";
import { Root } from "./Root";
import { GatsbyPageContext } from "./types";

export const wrapPageElement = ({
  element,
  props,
}:
  | WrapPageElementBrowserArgs<any, GatsbyPageContext>
  | WrapPageElementNodeArgs<any, GatsbyPageContext>) => (
  <AnimatePresence exitBeforeEnter>
    <Root pageContext={props.pageContext}>{element}</Root>
  </AnimatePresence>
);
