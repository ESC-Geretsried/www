import { ComponentMultiStyleConfig } from "@chakra-ui/theme";

export const Footer: ComponentMultiStyleConfig = {
  parts: ["footer", "column"],
  baseStyle: {
    footer: {
      borderTop: "2px solid",
      borderColor: "base.ice",
      gridColumn: { base: "1/-1", md: "4 / -1" },
      display: "grid",
      gridTemplateColumns: { base: "1fr 1fr", md: "repeat(10, 1fr)" },
      gridGap: { base: 4, md: 10 },
      py: 10,
    },
    column: {
      gridColumn: { base: "span 1", md: "span 2" },
    },
  },
};
