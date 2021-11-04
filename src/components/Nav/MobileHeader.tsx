import { Flex } from "@chakra-ui/layout";
import { ChakraProps } from "@chakra-ui/system";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import React, { memo } from "react";
import Logo from "../../assets/logo-cropped.svg";
import { BurgerButton } from "../../atoms/BurgerButton/BurgerButton";
import { Link } from "../../atoms/Link";
import { useStore } from "../../store/store";
import { MenuItemType } from "../../types";
import { MobileMenu } from "../Menu/MobileMenu";
import { MobileTitle } from "./MobileTitle";

export const headerAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: {
    type: "spring",
    mass: "0.35",
    stiffness: "75",
    duration: "0.25",
  },
};

export const MobileHeader: React.FC<
  { menuItems: Array<MenuItemType> } & ChakraProps
> = memo(({ menuItems, ...rest }) => {
  const btnRef = React.useRef<any>();
  const { isMobileMenuOpen, setIsMobileMenuOpen, siteTitle } = useStore();

  return (
    <Flex
      pos="fixed"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      {...rest}
      pe={{ base: 4, xl: 0 }}
      ps={{ base: 0, xl: 6 }}
      bg="brand.blue"
    >
      <BurgerButton
        isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        ref={btnRef}
      />
      <MobileMenu
        placement="left"
        finalFocusRef={btnRef}
        menuItems={menuItems}
      />
      <MobileTitle />

      <Link to="/">
        <Logo width="3.2em" height="3.2em" />
        <VisuallyHidden>Home</VisuallyHidden>
      </Link>
    </Flex>
  );
});
