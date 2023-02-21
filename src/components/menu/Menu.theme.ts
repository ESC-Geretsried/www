import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers([
  "mobile",
  "desktop",
  "item",
  "list",
]);

export const Menu = helpers.defineMultiStyleConfig({
  baseStyle: {
    mobile: {
      display: { base: "block", md: "none" },
    },
    desktop: {
      display: { base: "none", md: "block" },
    },
  },
});
