import { ButtonProps, useMultiStyleConfig } from "@chakra-ui/react";
import { chakra, forwardRef } from "@chakra-ui/system";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import React from "react";
import { Span } from "../Span";

type BurgerButtonProps = { isOpen: boolean } & ButtonProps;
const Button = chakra.button;

export const BurgerButton = forwardRef<BurgerButtonProps, "button">(
  ({ isOpen, ...rest }, ref) => {
    const styles = useMultiStyleConfig("BurgerButton", {});

    return (
      <Button
        {...rest}
        ref={ref}
        __css={styles.Hamburger}
        className={isOpen ? "is-active" : ""}
      >
        <Span __css={styles.HamburgerBox}>
          <Span __css={styles.HamburgerInner} />
        </Span>
        <VisuallyHidden>Menü Button</VisuallyHidden>
      </Button>
    );
  }
);
