import React from "react";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import { Location } from "@reach/router";

const Link: React.FC<GatsbyLinkProps<{}>> = ({ ref, to, children, ...rest }) => {
  if (to.match(/^http.*/)) {
    return (
      <a {...rest} href={to}>
        {children}
      </a>
    );
  }

  return (
    <Location>
      {() => {
        return (
          <GatsbyLink {...rest} to={to}>
            {children}
          </GatsbyLink>
        );
      }}
    </Location>
  );
};

export default Link;
