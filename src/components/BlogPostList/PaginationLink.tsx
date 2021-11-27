import { chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { Link, LinkProps } from "../../atoms/Link";
import { Optional } from "../../types";

export const PaginationLink: React.FC<
  Optional<LinkProps, "to"> & { isActive?: boolean }
> = ({ to, isActive, ...rest }) => {
  if (to === undefined) {
    return (
      <Flex>
        <chakra.span {...rest} px={3} py={1} />
      </Flex>
    );
  }

  return (
    <Link
      to={to}
      variant="Button"
      color={isActive ? "brand.gold" : "brand.ice"}
      {...rest}
    />
  );
};
