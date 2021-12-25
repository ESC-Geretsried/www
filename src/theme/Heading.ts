import { SystemStyleObject } from "@chakra-ui/styled-system";
import {
  ComponentSingleStyleConfig,
  ComponentMultiStyleConfig,
} from "@chakra-ui/theme";
import { textStyles } from "./textStyles";

export const sizes: Record<string, SystemStyleObject> = {
  h1: {
    fontSize: ["3xl", null, "4xl"],
    lineHeight: [1.33, null, 1.2],
  },
  h2: {
    fontSize: ["2xl", null, "3xl"],
    lineHeight: [1.33, null, 1.2],
  },
  h3: { fontSize: "xl", lineHeight: 1.2 },
  h4: { fontSize: "md", lineHeight: 1.2 },
  h5: { fontSize: "md", lineHeight: 1.2 },
  h6: { fontSize: "sm", lineHeight: 1.2 },
};

export const Heading: ComponentSingleStyleConfig = {
  baseStyle: {
    // wordWrap: "break-word",
    hyphens: "auto",
    fontStyle: "italic",
    my: "0.4em",
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
