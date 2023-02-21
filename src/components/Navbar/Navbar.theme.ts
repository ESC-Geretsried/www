import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["container"]);

export const Navbar = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      padding: "1rem",
      zIndex: 10,
      pointerEvents: "auto",
      border: "2px solid tomato",
    },
  },
});
