import { extendBaseTheme } from "@chakra-ui/react";
import { Accordion } from "../components/Accordion.theme";
import { Drawer } from "../components/Drawer.theme";
import { Layout } from "../components/Layout/Layout.theme";
import { Menu } from "../components/Menu/Menu.theme";
import { MenuList } from "../components/Menu/MenuList.theme";
import { Navbar } from "../components/Navbar/Navbar.theme";

const colors = {
  blue: "#223550",
  gold: "#A8803B",
  gray: {
    light: "rgba(255, 255, 255, 0.87)",
    transparent: "rgba(255, 255, 255, 0.5)",
    dark: "#6B6B6B",
  },
  white: "#fff",
  black: "#0B0B0B",
  ice: "rgba(255, 255, 255, 0.87)",
};

const base = extendBaseTheme({
  config: {
    initialColorMode: "dark",
  },
  global: {
    body: {
      bg: "blue",
      color: "ice",
    },
    a: {
      _hover: {
        textDecoration: "underline",
      },
    },
  },

  components: {
    Layout,
    Navbar,
    Menu,
    MenuList,
    Accordion,
    Drawer,
  },
});

// We only need our own colors
base.colors = colors;
base.sizes = {
  maxContainer: "75rem",
};
delete base.space;

export const theme = base;
