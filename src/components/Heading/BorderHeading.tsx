import classNames from "classnames";
import React, { ReactNode } from "react";
import { Hx } from "./Heading";

type BorderHeadingProps = {
  children?: ReactNode;
  className?: string;
};

export const BorderHeading: React.FC<BorderHeadingProps> = ({
  children,
  className = "text-3xl",
}) => {
  return (
    <Hx className={classNames("py-2 border-y-2 ", className)}>{children}</Hx>
  );
};
