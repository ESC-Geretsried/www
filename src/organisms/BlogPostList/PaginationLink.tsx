import { Box, BoxProps, ButtonProps, Flex } from "@chakra-ui/react";
import React from "react";
import { Link, LinkProps } from "../../atoms/Link";
import { Span } from "../../atoms/Span";
import { Optional } from "../../types";

export const PaginationLink: React.FC<
  Optional<LinkProps, "to"> & { isActive?: boolean }
> = ({ to, key, isActive, ...props }) => {
  if (to === undefined) {
    return (
      <Flex key={key}>
        <Span {...props} px={3} />
      </Flex>
    );
  }

  return (
    <Link
      key={key}
      to={to}
      variant="Button"
      color={isActive ? "brand.gold" : "brand.ice"}
      {...props}
    />
  );
};
