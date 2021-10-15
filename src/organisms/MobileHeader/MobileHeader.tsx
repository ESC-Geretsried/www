import React, { memo, useEffect, useState } from "react";
import { MobileMenu } from "../../molecules/Menu/MobileMenu";
import { BurgerButton } from "../../atoms/BurgerButton/BurgerButton";
import { MotionBox } from "../../atoms/MotionBox/MotionBox";
import { Flex } from "@chakra-ui/layout";
import { MenuItemType } from "../../types";
import { ChakraProps } from "@chakra-ui/system";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../store/store";

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
      alignContent="center"
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
      <div>
        <AnimatePresence exitBeforeEnter>
          <MotionBox
            key={isMobileMenuOpen ? "Menü" : siteTitle}
            {...headerAnimation}
          >
            {isMobileMenuOpen ? "Menü" : siteTitle}
          </MotionBox>
        </AnimatePresence>
      </div>
      <div>logo</div>
    </Flex>
  );
});
