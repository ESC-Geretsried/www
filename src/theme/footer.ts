import { ComponentMultiStyleConfig } from "@chakra-ui/theme";

export const Footer: ComponentMultiStyleConfig = {
  parts: ["footer", "column"],
  baseStyle: {
    footer: {
      borderTop: "2px solid",
      borderColor: "base.ice",
      gridColumn: { base: "1/-1", xl: "4 / -1" },
      display: "grid",
      gridTemplateColumns: { base: "1fr 1fr", xl: "repeat(10, 1fr)" },
      gridGap: { base: 4, xl: 10 },
      py: 10,
      mx: { base: 4, xl: 0 },
    },
    column: {
      gridColumn: { base: "span 1", xl: "span 2" },
    },
  },
};
