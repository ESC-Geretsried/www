import { ComponentSingleStyleConfig } from "@chakra-ui/theme";
import { Button, MenuItemBase } from "./Button";

export const Link: ComponentSingleStyleConfig = {
  baseStyle: {
    fontStyle: "italic",
    _hover: {
      color: "brand.gold",
      textDecor: "none",
    },
    _focus: { boxShadow: "none" },
    _focusVisible: { boxShadow: "none", textDecoration: "underline" },
  },
  variants: {
    MenuItem: {
      ...MenuItemBase,
      fontFamily: "Rubik",
      fontWeight: "bold",
      textTransform: "uppercase",
      py: "0.35rem",
    },
    MenuChildItem: {
      ...MenuItemBase,
      py: 0,
      ps: 6,
      fontFamily: "PT Sans",
      fontWeight: "normal",
    },
    Button: {
      ...(Button.baseStyle ?? {}),
      paddingInline: 3,
      paddingBlock: 1,
      // fontFamily: "Rubik",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    Disabled: {
      opacity: 0.7,
      cursor: "not-allowed",
      _hover: {
        color: "brand.ice",
      },
    },
    DisabledButton: {
      ...(Button.baseStyle ?? {}),
      paddingInline: 3,
      paddingBlock: 1,
      fontWeight: "bold",
      fontStyle: "normal",
      opacity: 0.7,
      cursor: "not-allowed",
      _hover: {
        color: "brand.ice",
      },
    },
  },
};
