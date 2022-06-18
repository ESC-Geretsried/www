import { ComponentMultiStyleConfig } from "@chakra-ui/theme";
import { sizes as headingSizes } from "./heading";
import { textStyles } from "./textStyles";

export const MatchReportHeader: ComponentMultiStyleConfig = {
  parts: ["container", "teamNames", "borders", "slugs", "score"],
  baseStyle: {
    container: {},
    teamNames: {
      display: "flex",
      justifyContent: "space-between",
      lineHeight: 1.7,
    },
    borders: {
      borderBlock: "4px solid",
      borderColor: "brand.ice",
    },
    slugs: {
      ...textStyles.matchReportSlugs,
      display: "flex",
      justifyContent: "center",
    },
    score: {
      ...textStyles.matchReportScore,
      display: "flex",
      justifyContent: "center",
      mt: 4,
    },
  },
};
