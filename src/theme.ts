import {
  ComponentSingleStyleConfig,
  CSSObject,
  extendTheme,
} from "@chakra-ui/react";
import { MenuLinkStyles } from "./molecules/Menu/MenuItem";
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
    mass: "0.35",
    stiffness: "75",
    duration: "0.25",
  },
};

export const lineBlock: CSSObject = {
  borderColor: "brand.ice",
  borderTopWidth: "2px",
  borderBottomWidth: "2px",
};

const ButtonStyles: ComponentSingleStyleConfig = {
  baseStyle: {
    background: "none",
    backgroundColor: "transparent",
    borderColor: "brand.ice",
    border: "2px solid",
    borderRadius: "0",
    _hover: {
      background: "none",
      backgroundColor: "transparent",
      borderColor: "brand.gold",
      color: "brand.gold",
    },
    _active: {
      background: "none",
      backgroundColor: "transparent",
      borderColor: "brand.gold",
      color: "brand.gold",
    },
    _focus: {
      boxShadow: "none",
    },
    _focusVisible: {
      boxShadow: "outline",
    },
  },
  variants: {
    MenuButton: {
      border: "none",
      fontFamily: "Rubik",
      fontStyle: "italic",
      fontWeight: "bold",
      px: "0",
      display: "block",
      width: "100%",
      textAlign: "left",
      _focusVisible: { textDecoration: "underline" },
      _hover: { textDecoration: "none" },
    },
  },
};

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: mode("brand.blue", "white")(props),
        color: mode("brand.ice", "almostBlack")(props),
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
    gray: {
      transparent: "rgba(255, 255, 255, 0.5)",
      dark: "#6B6B6B",
    },
    white: "#fff",
    almostBlack: "#0B0B0B",
  },
  components: {
    Link: MenuLinkStyles,
    Button: ButtonStyles,
    Heading: {
      variants: {
        MobileSiteTitle: {
          textTransform: "uppercase",
          fontStyle: "italic",
          textAlign: "center",
          fontSize: "xl",
          // fontSize: "",
          // textDecoration: "underlinea",
        },
      },
    },
  },
});
