import { Heading } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { MotionBox } from "../../atoms/MotionBox/MotionBox";
import { useStore } from "../../store/store";
import { useTranslation } from "../../translation/useTranslation";
import { Hx } from "../headings";

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

export const MobileTitle: React.FC = () => {
  const { isMobileMenuOpen, siteTitle } = useStore();
  const menu = useTranslation("menu");

  return (
    <AnimatePresence exitBeforeEnter>
      <MotionBox
        key={(isMobileMenuOpen ? menu : siteTitle) as React.Key}
        {...headerAnimation}
      >
        <Hx variant="MobileSiteTitle">{isMobileMenuOpen ? menu : siteTitle}</Hx>
      </MotionBox>
    </AnimatePresence>
  );
};
