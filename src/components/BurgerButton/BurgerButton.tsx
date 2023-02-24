import classNames from "classnames";
import React, { ReactNode } from "react";
import "./burger.css";

type BurgerButtonProps = {
  children?: ReactNode;
  className?: string;
};

export const BurgerButton: React.FC<BurgerButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      {...rest}
      style={{
        "--burgerColor": "white",
      }}
      className={classNames("hamburger hamburger--squeeze", className)}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner">
          <span className="sr-only">Open Menu</span>
        </span>
      </span>
    </button>
  );
};
