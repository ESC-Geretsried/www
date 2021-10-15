import { Heading } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { MotionBox } from "../../atoms/MotionBox/MotionBox";
import { useStore } from "../../store/store";
import { headerAnimation } from "./MobileHeader";

export const MobileTitle: React.FC = () => {
  const { isMobileMenuOpen, siteTitle } = useStore();

  return (
    <AnimatePresence exitBeforeEnter>
      <MotionBox
        key={isMobileMenuOpen ? "Menü" : siteTitle}
        {...headerAnimation}
      >
        <Heading as="h1" variant="MobileSiteTitle">
          {isMobileMenuOpen ? "Menü" : siteTitle}
        </Heading>
      </MotionBox>
    </AnimatePresence>
  );
};
