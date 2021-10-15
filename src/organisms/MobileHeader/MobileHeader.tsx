import React, { memo } from "react";
import { MobileMenu } from "../../molecules/Menu/MobileMenu";
import { BurgerButton } from "../../atoms/BurgerButton/BurgerButton";
import { MotionBox } from "../../atoms/MotionBox/MotionBox";
import { Box, Flex } from "@chakra-ui/layout";
import { MenuItemType } from "../../types";
import { ChakraProps } from "@chakra-ui/system";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../store/store";
import { Heading } from "@chakra-ui/react";
import Logo from "../../assets/logo-cropped.svg";

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
      justifyContent="space-between"
      alignItems="center"
      bg="brand.blue"
      {...rest}
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
      <AnimatePresence exitBeforeEnter>
        <MotionBox
          key={isMobileMenuOpen ? "Menü" : siteTitle}
          {...headerAnimation}
        >
          <Heading as="h1">{isMobileMenuOpen ? "Menü" : siteTitle}</Heading>
        </MotionBox>
      </AnimatePresence>
      <Box width="3.2em" height="3.2em">
        <Logo />
      </Box>
    </Flex>
  );
});
