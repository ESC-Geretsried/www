import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers([
  "item",
  "submenu",
  "submenuItem",
]);

export const MenuList = defineMultiStyleConfig({
  baseStyle: {
    submenu: {
      listStyleType: "none",
    },
    item: {
      display: "inline-block",
      width: "100%",
      paddingBlock: "0.25rem",
      _hover: {
        textDecoration: "underline",
      },
    },
    submenuItem: {
      paddingBlock: "0.25rem",
      display: "inline-block",
      width: "100%",
    },
  },
});
