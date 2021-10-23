import { Box, BoxProps, forwardRef } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { mainAnimationProps } from "../../theme/animations";
import { navHeight } from "../../theme/misc";
import { calcColumnWidths } from "../../utils/style.utils";

const MainContainer: React.FC = forwardRef(({ ...rest }, ref) => (
  <Box
    as="main"
    ps={{
      base: 6,
      ...calcColumnWidths(2, {
        excludeBPs: ["base", "sm", "md", "lg"],
        addGap: 6,
      }),
    }}
    pe={{ base: 6 }}
    paddingBlockStart={{
      base: navHeight.base,
      xl: 0,
    }}
    ref={ref}
    {...rest}
  />
));

const AnimatedMain = motion<BoxProps>(MainContainer);

export const Main: React.FC = ({ children }) => (
  <AnimatedMain {...mainAnimationProps}>{children}</AnimatedMain>
);
