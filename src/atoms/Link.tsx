import React from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  useStyleConfig,
} from "@chakra-ui/react";
import { trimChars } from "../utils/shared.utils";
import { Span } from "./Span";

const trimSlashes = (str: string): string => trimChars(str, "/");

export type LinkProps = GatsbyLinkProps<Record<string, unknown>> &
  ChakraLinkProps & { disabled?: boolean | "Disabled" | "DisabledButton" };

export const Link: React.FC<LinkProps> = ({
  disabled,
  to,
  children,
  ...rest
}) => {
  const DisabledSyles = useStyleConfig("Link", {
    variant: typeof disabled === "string" ? disabled : "Disabled",
  });
  if (disabled) {
    return <Span __css={DisabledSyles}>{children}</Span>;
  }
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
