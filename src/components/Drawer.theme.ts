import { drawerAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  drawerAnatomy.keys
);

export const Drawer = defineMultiStyleConfig({
  baseStyle: {
    body: {
      mt: "var(--navbar-height, 4rem)",
      backgroundColor: "blue",
      height: "100vh",
    },
  },
});
