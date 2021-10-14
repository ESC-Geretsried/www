import React, { memo } from "react";
import {
  Box,
  ComponentSingleStyleConfig,
  useStyleConfig,
} from "@chakra-ui/react";
import { MenuItemType } from "../../types";
import { Link } from "../../atoms/Link";
import { useStore } from "../../store/store";

export const MenuLinkStyles: ComponentSingleStyleConfig = {
  // Styles for the base style
  baseStyle: {
    fontStyle: "italic",
    _hover: {
      color: "brand.gold",
      textDecor: "none",
    },
    _focus: { boxShadow: "none" },
    _focusVisible: { boxShadow: "none", textDecoration: "underline" },
  },
  // Styles for the visual style variations
  variants: {
    MenuItem: {
      py: 2,
      fontFamily: "Rubik",
      fontWeight: "bold",
    },
    MenuChildItem: {
      py: 0,
      ps: 6,
      fontFamily: "PT Sans",
      fontWeight: "normal",
    },
  },
};

type MenuItemProps = Omit<MenuItemType, "childItems" | "parentId"> & {
  isChildItem?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  url,
  label,
  isChildItem = false,
}) => {
  const { setIsMobileMenuOpen } = useStore();

  return (
    <Link
      to={url}
      display="block"
      _focus={{ boxShadow: "none" }}
      _focusVisible={{ textDecoration: "underline" }}
      onClick={() => {
        setIsMobileMenuOpen(false);
      }}
      variant={isChildItem ? "MenuChildItem" : "MenuItem"}
    >
      {label}
    </Link>
  );
};
