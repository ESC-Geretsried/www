import { ChakraTheme, ThemeConfig } from "@chakra-ui/theme";
import { mode, StyleFunctionProps, Styles } from "@chakra-ui/theme-tools";
import { BurgerButtonStyles } from "../atoms/BurgerButton/BurgerButtonStyles";
import { Button } from "./Button";
import { Colors, extendTheme } from "@chakra-ui/react";
import { Link } from "./Link";
import { Heading } from "./Heading";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors: Colors = {
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
  black: "#000",
  almostBlack: "#0B0B0B",
};

const styles: Styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      backgroundColor: mode("white", "brand.blue")(props),
      color: mode("almostBlack", "brand.ice")(props),
      // TODO: fix font Size on 2xl bp
      // fontSize: { base: "100%", "2xl": "112.5%" },
    },
    a: {
      backgroundImage:
        "linear-gradient(rgba(255, 255, 255, 0.87), rgba(255, 255, 255, 0.87)), linear-gradient(#A8803B, #A8803B)",
      backgroundSize: "100% 1px, 0 1px",
      backgroundPosition: "100% 100%, 0 100%",
      backgroundRepeat: "no-repeat",
      transition: "background-size 0.4s ease-in",
      _hover: {
        backgroundSize: "0 1px, 100% 1px",
      },
    },
  }),
};

const defaultTheme = extendTheme({
  colors,
  config,
  styles,
  fonts: {
    heading: "Rubik",
    body: "PT Sans",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.3rem",
    "3xl": "1.4rem",
  },
  components: {
    Link,
    //MenuLinkStyles,
    BurgerButton: BurgerButtonStyles,
    Button,
    Heading,
  },
} as Partial<ChakraTheme>);

export const theme = defaultTheme;
