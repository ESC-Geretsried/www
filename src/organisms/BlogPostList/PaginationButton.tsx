import {
  Box,
  BoxProps,
  ButtonProps,
  Button as ChakraButton,
  Flex,
} from "@chakra-ui/react";
import React from "react";

export const PaginationButton: React.FC<
  ButtonProps & BoxProps & { name: string }
> = ({ name, ...props }) => {
  if (name.startsWith("ellipsis") || name.includes("show-only-index")) {
    return (
      <Flex alignItems="center">
        <Box {...props} as="span" fontSize="1.2rem" px={3} />
      </Flex>
    );
  }

  return <ChakraButton {...props} />;
};
