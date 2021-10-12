import React, { memo } from "react";
import {
  ListItem,
  ComponentSingleStyleConfig,
  useStyleConfig,
  Box,
} from "@chakra-ui/react";
import { MenuItemType } from "../types";
import { Link } from "../atoms/Link";

export const MenuItemStyles: ComponentSingleStyleConfig = {
  // Styles for the base style
  baseStyle: {
    fontStyle: "italic",
    _hover: {
      color: "brand.gold",
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

export const MenuItem: React.FC<MenuItemProps> = memo(
  ({ isNavigationDelayed, isActive, url, label, isChildItem = false }) => {
    const styles = useStyleConfig("MenuItem", {
      variant: isChildItem ? "childItem" : "item",
    });

    return (
      <Link
        delayNavigation={isNavigationDelayed ? 250 : undefined}
        to={url}
        sx={styles}
        textDecoration={isActive ? "underline" : "none"}
        display="block"
        _focus={{ boxShadow: "none" }}
        _focusVisible={{ textDecoration: "underline" }}
        _hover={{ textDecoration: "none" }}
      >
        {label}
      </Link>
    );
  }
);
