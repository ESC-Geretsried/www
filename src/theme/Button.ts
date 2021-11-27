import { ComponentSingleStyleConfig } from "@chakra-ui/react";

export const MenuItemBase = {
  display: "block",
  _focus: { boxShadow: "none" },
  _focusVisible: { textDecoration: "underline" },
  backgroundImage: "none",
  _hover: {
    backgroundImage: "none",
    color: "brand.gold",
  },
  lineHeight: "2",
};

export const Button: ComponentSingleStyleConfig = {
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
      py: "0.35rem",
      ...MenuItemBase,
      border: "none",
      fontFamily: "Rubik",
      fontStyle: "italic",
      fontWeight: "bold",
      px: "0",
      width: "100%",
      textAlign: "left",
      _hover: { textDecoration: "none" },
      textTransform: "uppercase",
      height: "auto",
    },
  },
};
