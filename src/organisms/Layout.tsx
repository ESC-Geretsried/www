import React from "react";
import { motion } from "framer-motion";
import { Nav } from "../organisms/Nav";
import { Box } from "@chakra-ui/layout";
import {
  adBannerHeight,
  containerWidths,
  mainAnimationProps,
  navHeight,
} from "../theme";
import { calcColumnWidths } from "../utils";
import { forwardRef } from "@chakra-ui/react";

const MainContainer: React.FC = forwardRef(({ ...rest }, ref) => (
  <Box
    as="main"
    height="200vh"
    width="100%"
    ps={{
      base: 6,
      ...calcColumnWidths(2, { excludeBPs: ["base", "sm", "md", "lg"] }),
    }}
    pe={{ base: 6 }}
    paddingBlockStart={{
      base: `calc(${adBannerHeight} + ${navHeight.base})`,
      xl: 0,
    }}
    ref={ref}
    {...rest}
  />
));

const AnimatedMain = motion(MainContainer);

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Box
        pos="fixed"
        top={{ base: navHeight.base, xl: 0 }}
        left="0"
        right="0"
        height={adBannerHeight}
      >
        Adbanner
      </Box>
      <Box
        mx="auto"
        width={containerWidths}
        marginBlockStart={{ base: 0, xl: adBannerHeight }}
      >
        <Nav />
        <AnimatedMain {...mainAnimationProps}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "1.5em",
            }}
          >
            <div style={{ gridColumn: "1 /-1" }}>
              {children}
              <footer>footer</footer>
            </div>
          </div>
        </AnimatedMain>
      </Box>
    </>
  );
};
