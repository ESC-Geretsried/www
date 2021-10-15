import {
  Box,
  Flex,
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/layout";
import React from "react";

type HeadingProps = {
  borders: boolean;
};

export const Heading: React.FC<HeadingProps & ChakraHeadingProps> = ({
  as,
  variant,
  borders = true,
  children,
  ...rest
}) => {
  if (borders) {
    return (
      <Flex width="100%">
        <Box
          display="inline-block"
          {...rest}
          borderBlock="2px solid"
          borderColor="brand.ice"
          textAlign="center"
        >
          <ChakraHeading as={as} hyphen="auto" padding="0.25em 0">
            {children}
          </ChakraHeading>
        </Box>
      </Flex>
    );
  }

  return (
    <ChakraHeading as={as} {...rest}>
      {children}
    </ChakraHeading>
  );
};
