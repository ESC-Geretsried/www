import React, { memo } from "react";
import {
  Box,
  ComponentSingleStyleConfig,
  useStyleConfig,
} from "@chakra-ui/react";
import { MenuItemType } from "../types";
import { Link } from "../atoms/Link";
import { useStore } from "../store/store";

export const MenuItemStyles: ComponentSingleStyleConfig = {
  // Styles for the base style
  baseStyle: {
    fontStyle: "italic",
    _hover: {
      color: "tomato",
    },
    _focus: { boxShadow: "none" },
    _focusVisible: { boxShadow: "none", textDecoration: "underline" },
  },
  // Styles for the visual style variations
  variants: {
    item: {
      py: 2,
      fontFamily: "Rubik",
      fontWeight: "bold",
    },
    childItem: {
      py: 0,
      ps: 6,
      fontFamily: "PT Sans",
      fontWeight: "normal",
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: "item",
  },
};

type MenuItemProps = Omit<MenuItemType, "childItems" | "parentId"> & {
  isChildItem?: boolean;
  isNavigationDelayed?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  isActive,
  url,
  label,
  isChildItem = false,
}) => {
  const styles = useStyleConfig("MenuItem", {
    variant: isChildItem ? "childItem" : "item",
  });

  const { setIsMobileMenuOpen } = useStore();

  return (
    <Box
      as="span"
      textDecoration={isActive ? "underline" : "none"}
      display="block"
      _focus={{ boxShadow: "none" }}
      _focusVisible={{ textDecoration: "underline" }}
      _hover={{ textDecoration: isActive ? "underline" : "none" }}
      onClick={() => {
        setIsMobileMenuOpen(false);
      }}
      __css={styles}
    >
      <Link to={url}>{label}</Link>
    </Box>
  );
};
