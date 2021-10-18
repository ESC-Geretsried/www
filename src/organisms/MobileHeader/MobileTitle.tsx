import { Heading } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { MotionBox } from "../../atoms/MotionBox/MotionBox";
import { useStore } from "../../store/store";
import { useTranslation } from "../../translation/useTranslation";
import { headerAnimation } from "./MobileHeader";

export const MobileTitle: React.FC = () => {
  const { isMobileMenuOpen, siteTitle } = useStore();
  const menu = useTranslation("menu");

  return (
    <AnimatePresence exitBeforeEnter>
      <MotionBox key={isMobileMenuOpen ? menu : siteTitle} {...headerAnimation}>
        <Heading as="h1" variant="MobileSiteTitle">
          {isMobileMenuOpen ? menu : siteTitle}
        </Heading>
      </MotionBox>
    </AnimatePresence>
  );
};
