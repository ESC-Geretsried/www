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
      justifyContent="space-between"
      alignItems="center"
      {...rest}
      pe={{ base: 6, xl: 0 }}
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

      <Box>
        <Logo width="3.2em" height="3.2em" />
      </Box>
    </Flex>
  );
});
