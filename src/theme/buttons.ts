import { ComponentSingleStyleConfig } from "@chakra-ui/react";

export const Buttons: ComponentSingleStyleConfig = {
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
