import { ButtonProps, useMultiStyleConfig } from "@chakra-ui/react";
import { chakra, forwardRef } from "@chakra-ui/system";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import React from "react";

type BurgerButtonProps = { isOpen: boolean } & ButtonProps;

export const BurgerButton = forwardRef<BurgerButtonProps, "button">(
  ({ isOpen, ...rest }, ref) => {
    const styles = useMultiStyleConfig("BurgerButton", {});

    return (
      <chakra.button
        {...rest}
        ref={ref}
        __css={styles.Hamburger}
        className={isOpen ? "is-active" : ""}
      >
        <chakra.span __css={styles.HamburgerBox}>
          <chakra.span __css={styles.HamburgerInner} />
        </chakra.span>
        <VisuallyHidden>Menü Button</VisuallyHidden>
      </chakra.button>
    );
  }
);
