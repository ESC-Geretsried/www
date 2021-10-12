import React, { memo, useEffect, useState } from "react";
import { MobileMenu } from "../../molecules/MobileMenu/MobileMenu";
import { BurgerButton } from "../../atoms/BurgerButton/BurgerButton";
import { MotionBox } from "../../atoms/MotionBox";
import { Flex } from "@chakra-ui/layout";
import { MenuItemType } from "../../types";
import { ChakraProps } from "@chakra-ui/system";
import { useDisclosure } from "@chakra-ui/hooks";
import { AnimatePresence, motion } from "framer-motion";

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
  { menuItems: Array<MenuItemType>; title: string } & ChakraProps
> = memo(({ menuItems, title, ...rest }) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [showMenuTitle, setShowMenuTitle] = useState(isOpen);
  const btnRef = React.useRef<any>();

  useEffect(() => {
    if (isOpen) {
      setShowMenuTitle(true);
    } else {
      // wait for page transition, before showing the title again (to prevent double animation)
      setTimeout(() => {
        setShowMenuTitle(false);
      }, 450);
    }
  }, [isOpen]);

  return (
    <Flex
      justifyContent="space-between"
      alignContent="center"
      bg="brand.blue"
      {...rest}
    >
      <BurgerButton isOpen={isOpen} onClick={onToggle} ref={btnRef} />
      <MobileMenu
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        menuItems={menuItems}
      />
      <div>
        <AnimatePresence exitBeforeEnter>
          <MotionBox key={showMenuTitle ? "Menü" : title} {...headerAnimation}>
            {showMenuTitle ? "Menü" : title}
          </MotionBox>
        </AnimatePresence>
      </div>
      <div>logo</div>
    </Flex>
  );
});
