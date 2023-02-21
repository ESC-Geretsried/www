import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  accordionAnatomy.keys
);

export const Accordion = defineMultiStyleConfig({
  variants: {
    menu: {
      root: {
        listStyleType: "none",
      },
      container: {
        border: "none",
      },
      panel: {
        paddingBlock: "0.25rem",
        paddingInlineStart: "2rem",
      },
      button: {
        paddingInline: 0,
        paddingBlock: "0.25rem",
      },
    },
  },
});
