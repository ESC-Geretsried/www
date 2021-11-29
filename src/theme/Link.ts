import { ComponentSingleStyleConfig } from "@chakra-ui/theme";
import { Button, MenuItemBase } from "./Button";
import { textStyles } from "./textStyles";

export const Link: ComponentSingleStyleConfig = {
  baseStyle: {
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
      ...textStyles.menuItemLink,
      textTransform: "uppercase",
      py: "0.35rem",
    },
    MenuChildItem: {
      ...MenuItemBase,
      ...textStyles.menuChildItemLink,
      py: 0,
      ps: 6,
    },
    Button: {
      ...(Button.baseStyle ?? {}),
      ...textStyles.buttonLink,
      paddingInline: 3,
      paddingBlock: 1,
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
      opacity: 0.7,
      cursor: "not-allowed",
      _hover: {
        color: "brand.ice",
      },
    },
    footer: {
      backgroundImage: "none",
      display: "block",
      w: "100%",
      lineHeight: "2",
    },
  },
};
