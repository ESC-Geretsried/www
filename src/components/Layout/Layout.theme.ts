import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["container", "sidebar", "main"]);

export const Layout = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      display: "grid",
      gridTemplateColumns: { base: "1fr", md: "3fr 9fr" },
      gap: { base: "1rem", md: "2rem" },
      px: "1rem",
      maxWidth: "maxContainer",
      m: "0 auto",
    },
    main: {
      mt: "var(--navbar-height)",
    },
  },
});
