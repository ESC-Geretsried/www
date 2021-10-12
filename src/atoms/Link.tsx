import React from "react";
import { Link as GatsbyLink, navigate } from "gatsby";
import { ChakraProps, Link as ChakraLink } from "@chakra-ui/react";

export const Link: React.FC<
  { to: string; delayNavigation?: number } & ChakraProps
> = ({ to, delayNavigation, children, ...rest }) => {
  return (
    <ChakraLink
      as={GatsbyLink}
      to={to}
      {...rest}
      onClick={
        delayNavigation
          ? (e) => {
              e.preventDefault();
              setTimeout(() => {
                navigate(to);
              }, delayNavigation);
            }
          : undefined
      }
    >
      {children}
    </ChakraLink>
  );
};
