import { SystemStyleObject } from "@chakra-ui/styled-system";
import { ComponentSingleStyleConfig } from "@chakra-ui/theme";

const sizes: Record<string, SystemStyleObject> = {
  xl: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2],
  },
  lg: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2],
  },
  md: { fontSize: "xl", lineHeight: 1.2 },
  sm: { fontSize: "md", lineHeight: 1.2 },
  xs: { fontSize: "sm", lineHeight: 1.2 },
};

export const Heading: ComponentSingleStyleConfig = {
  baseStyle: {
    hyphens: "auto",
  },
  sizes,
  variants: {
    MobileSiteTitle: {
      textTransform: "uppercase",
      fontStyle: "italic",
      textAlign: "center",
      fontSize: "xl",
    },
    Border: {
      padding: "0.25em 0",
      borderBlock: "4px solid",
      borderColor: "brand.ice",
      textTransform: "uppercase",
      fontStyle: "italic",
    },
    Calendar: {
      borderBlockEnd: "2px solid",
      borderColor: "brand.ice",
      py: 2,
      fontSize: "1rem",
      // textTransform: "uppercase",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    "bold-body": {
      fontFamily: "body",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
};
