import { CSSObject } from "@chakra-ui/react";
import { BreakpointObject } from "../types";

export const containerWidths: BreakpointObject = {
  base: "100%",
  // lg: "60em",
  xl: "78em",
  "2xl": "94em",
};

export const adBannerHeight = "60px";

export const navHeight: BreakpointObject = {
  base: "78px",
  xl: "auto",
};

export const lineBlock: CSSObject = {
  borderColor: "brand.ice",
  borderTopWidth: "2px",
  borderBottomWidth: "2px",
};
