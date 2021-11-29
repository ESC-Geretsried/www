import { SystemStyleObject } from "@chakra-ui/styled-system";
import { ComponentSingleStyleConfig } from "@chakra-ui/theme";
import { textStyles } from "./textStyles";

export const sizes: Record<string, SystemStyleObject> = {
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
    // wordWrap: "break-word",
    hyphens: "auto",
    fontStyle: "italic",
  },
  sizes,
  variants: {
    MobileSiteTitle: {
      ...textStyles.mobileSiteTitle,
      textTransform: "uppercase",
      textAlign: "center",
    },
    Border: {
      padding: "0.25em 0",
      borderBlock: "4px solid",
      borderColor: "brand.ice",
      textTransform: "uppercase",
      fontStyle: "italic",
    },
    Calendar: {
      ...textStyles.calendarTitles,
      borderBlockEnd: "2px solid",
      borderColor: "brand.ice",
      py: 2,
      // textTransform: "uppercase",
    },
    h6: {
      ...textStyles.h6,
    },
    "bold-body": {
      fontFamily: "body",
      fontSize: "1rem",
      fontWeight: "bold",
    },
    "team-names": {
      ...textStyles.base,
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
  },
};
