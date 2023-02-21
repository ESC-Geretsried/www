import { chakra, ButtonProps } from "@chakra-ui/react";
import React from "react";

type VisuallyHiddenUntilFocusedProps = ButtonProps;

export const VisuallyHiddenUntilFocusedButton: React.FC<
  VisuallyHiddenUntilFocusedProps
> = ({ children, ...rest }) => {
  return (
    <chakra.button
      sx={{
        border: 0,
        clip: "rect(0, 0, 0, 0)",
        height: 1,
        width: 1,
        margin: -1,
        padding: 0,
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "absolute",

        _focus: {
          clip: "auto",
          height: "inherit",
          width: "inherit",
          margin: "0",
          overflow: "visible",
          position: "static",
        },
      }}
      {...rest}
    >
      {children}
    </chakra.button>
  );
};
