import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { HTMLMotionProps, m } from "framer-motion";

const MBox = m<BoxProps>(Box);

export const MotionBox: React.FC<BoxProps & HTMLMotionProps<"div">> = (
  props
) => {
  return <MBox {...props} />;
};
