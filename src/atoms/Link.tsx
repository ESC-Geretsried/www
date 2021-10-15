import React from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { trimChars } from "../utils/shared.utils";

const trimSlashes = (str: string): string => trimChars(str, "/");

export const Link: React.FC<
  GatsbyLinkProps<Record<string, unknown>> & LinkProps
> = ({ ref, to, children, ...rest }) => {
  const isExternalLink = to.match(/^http.*/);
  const isEmailAddress = to.match(/^mailto:/);
  const isPhoneNumber = to.match(/^tel:/);
  const isFaxNumber = to.match(/^fax:/);

  if (isExternalLink || isEmailAddress || isPhoneNumber || isFaxNumber) {
    return (
      // TypeScript can't infer we are in fact setting the correct rel attributes for external links.
      // eslint-disable-next-line react/jsx-no-target-blank
      <ChakraLink
        {...rest}
        rel={isExternalLink ? "noopener noreferrer" : rest.rel}
        target={isExternalLink ? "_blank" : rest.target}
        href={isPhoneNumber || isFaxNumber ? to.replace(/\s/g, "") : to}
      >
        {children}
      </ChakraLink>
    );
  }

  return (
    <ChakraLink
      {...rest}
      as={GatsbyLink}
      to={to === "/" ? to : `/${trimSlashes(to)}/`}
    >
      {children}
    </ChakraLink>
  );
};
