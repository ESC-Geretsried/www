import { ComponentMultiStyleConfig } from "@chakra-ui/theme";
import { adBannerHeight, navHeight } from "./misc";

export const Extra: ComponentMultiStyleConfig = {
  parts: ["wrapper", "heading"],
  baseStyle: {
    wrapper: {
      top: { md: navHeight.base, xl: adBannerHeight },
      pos: "sticky",
    },
    heading: {
      paddingBlockEnd: 2,
    },
  },
};
