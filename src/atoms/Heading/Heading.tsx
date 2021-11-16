import {
  Box,
  Flex,
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/layout";
import React from "react";
import { Hx } from "../../components/headings";

type HeadingProps = {
  borders?: boolean;
};

export const Heading: React.FC<HeadingProps & ChakraHeadingProps> = ({
  as,
  variant,
  borders = true,
  size,
  children,
  ...rest
}) => {
  if (borders) {
    return (
      <Flex display="grid" justifyItems="start">
        <Hx size={size} variant={borders ? "Border" : undefined} {...rest}>
          {children}
        </Hx>
      </Flex>
    );
  }

  return (
    <Hx size={size} hyphens="auto" {...rest}>
      {children}
    </Hx>
  );
};
