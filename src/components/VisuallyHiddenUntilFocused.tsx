import React from "react";

export const VisuallyHiddenUntilFocusedButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...rest }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`sr-only focus:not-sr-only ${className}`} {...rest}>
      {children}
    </button>
  );
};

export const VisuallyHiddenUntilFocusedLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ children, className, ...rest }) => {
  return (
    <a className={`sr-only focus:not-sr-only ${className}`} {...rest}>
      {children}
    </a>
  );
};
