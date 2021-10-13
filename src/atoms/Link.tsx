import React from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";

// const trimSlashes = (str: string): string => trimChars(str, "/");

export const Link: React.FC<GatsbyLinkProps<Record<string, unknown>>> = ({
  ref,
  to,
  children,
  ...rest
}) => {
  const isExternalLink = to.match(/^http.*/);
  const isEmailAddress = to.match(/^mailto:/);
  const isPhoneNumber = to.match(/^tel:/);
  const isFaxNumber = to.match(/^fax:/);

  if (isExternalLink || isEmailAddress || isPhoneNumber || isFaxNumber) {
    return (
      // TypeScript can't infer we are in fact setting the correct rel attributes for external links.
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        {...rest}
        rel={isExternalLink ? "noopener noreferrer" : rest.rel}
        target={isExternalLink ? "_blank" : rest.target}
        href={isPhoneNumber || isFaxNumber ? to.replace(/\s/g, "") : to}
      >
        {children}
      </a>
    );
  }

  return (
    <GatsbyLink to={to} {...rest}>
      {children}
    </GatsbyLink>
  );
};
