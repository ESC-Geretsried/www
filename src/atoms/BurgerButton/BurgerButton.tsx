import { Box, BoxProps } from "@chakra-ui/react";
import { ChakraProps, forwardRef } from "@chakra-ui/system";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import React from "react";

type BurgerButtonProps = React.FC<
  { isOpen: boolean; onClick: () => void } & ChakraProps
>;

export const BurgerButton = forwardRef<BoxProps, BurgerButtonProps>(
  ({ isOpen, onClick, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        as="button"
        onClick={onClick}
        {...rest}
        className={`hamburger hamburger--squeeze ${isOpen ? "is-active" : ""}`}
      >
        <span
          className="hamburger-box"
          style={{ transform: " translate(-50%, 50%)" }}
        >
          <span className="hamburger-inner" />
        </span>
        {/* <VisuallyHidden>Menu</VisuallyHidden> */}
      </Box>
    );
  }
);
