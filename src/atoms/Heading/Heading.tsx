import {
  Box,
  Flex,
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/layout";
import React from "react";

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
        <ChakraHeading
          as={as}
          size={size}
          variant={borders ? "Border" : undefined}
          {...rest}
        >
          {children}
        </ChakraHeading>
      </Flex>
    );
  }

  return (
    <ChakraHeading as={as} size={size} hyphens="auto" {...rest}>
      {children}
    </ChakraHeading>
  );
};
