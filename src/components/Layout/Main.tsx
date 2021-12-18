import { BoxProps, chakra, forwardRef } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { mainAnimationProps } from "../../theme/animations";

const MainContainer: React.FC = forwardRef(({ ...rest }, ref) => (
  <chakra.main
    display="grid"
    gridTemplateColumns={{ base: "repeat(4, 1fr)", lg: "repeat(9, 1fr)" }}
    gridGap={{ base: 2, md: 6, "2xl": 12 }}
    ref={ref}
    px={{ base: 4, xl: 0 }}
    gridColumn={{ base: "1/-1", xl: "4/ -1" }}
    {...rest}
  />
));

const AnimatedMain = motion<BoxProps>(MainContainer);

// export const Main = MainContainer;
export const Main: React.FC<BoxProps> = ({ children }) => (
  <AnimatedMain {...mainAnimationProps}>{children}</AnimatedMain>
);
