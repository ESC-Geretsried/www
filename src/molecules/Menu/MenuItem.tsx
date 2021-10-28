import React from "react";
import { Link } from "../../atoms/Link";
import { useStore } from "../../store/store";
import { MenuItemType } from "../../types";

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
