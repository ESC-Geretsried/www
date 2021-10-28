import { ThemeConfig } from "@chakra-ui/theme";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { BurgerButtonStyles } from "../atoms/BurgerButton/BurgerButtonStyles";
import { Button } from "./Button";
import { extendTheme } from "@chakra-ui/react";
import { Link } from "./Link";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
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

const defaultTheme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor: mode("white", "brand.blue")(props),
        color: mode("almostBlack", "brand.ice")(props),
      },
    }),
  },
  fonts: {
    heading: "Rubik",
    body: "PT Sans",
  },
  components: {
    Link,
    //MenuLinkStyles,
    BurgerButton: BurgerButtonStyles,
    Button,
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

defaultTheme.colors = colors;

export const theme = defaultTheme;
