import { extendTheme } from "@chakra-ui/react";
import { MenuItemStyles as MenuItem } from "./atoms/MenuItem";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { BreakpointObject } from "./types";
import { BurgerButtonStyles } from "./atoms/BurgerButton/BurgerButtonStyles";

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

export const mainAnimationProps = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
  transition: {
    type: "spring",
    mass: 0.35,
    stiffness: 75,
    duration: 0.25,
  },
};

export const line = {
  base: "2px solid rgba(255, 255, 255, 0.87)",
};

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: mode("brand.blue", "white")(props),
        color: mode("copy.light", "copy.dark")(props),
      },
      ...BurgerButtonStyles,
    }),
  },
  fonts: {
    heading: "Rubik",
    body: "PT Sans",
  },
  colors: {
    brand: {
      blue: "#223550",
      gold: "#A8803B",
      ice: "rgba(255, 255, 255, 0.87)",
    },
    copy: {
      light: "rgba(255, 255, 255, 0.87)",
      dark: "#0B0B0B",
    },
    gray: {
      line: "rgba(255, 255, 255, 0.87)",
      text: "rgba(255, 255, 255, 0.87)",
      transparent: "rgba(255, 255, 255, 0.5)",
      dark: "#6B6B6B",
    },
    white: "#fff",
    almostBlack: "#0B0B0B",
  },
  components: {
    MenuItem,
  },
});
