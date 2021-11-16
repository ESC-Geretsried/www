// cf. https://github.com/chakra-ui/chakra-ui/issues/4396

import * as React from "react";
import { useContext, createContext, useMemo } from "react";
import { Heading, HeadingProps } from "@chakra-ui/react";

const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const defaultLevel = "h1";

type HeadingLevel = typeof headingLevels[number];

const Context = createContext<HeadingLevel>(defaultLevel);

export const HeadingLevelBoundary: React.FC<{ level?: HeadingLevel }> = ({
  level,
  children,
}) => {
  const levelFromContext = useContext(Context);

  const increasedLevelFromContext = useMemo(() => {
    if (!level) {
      const index = headingLevels.indexOf(levelFromContext);

      if (index >= headingLevels.length) {
        return headingLevels[headingLevels.length - 1]; // cap at h6
      }

      return headingLevels[index + 1];
    }

    return undefined;
  }, [level, levelFromContext]);

  return (
    <Context.Provider
      value={level ?? increasedLevelFromContext ?? defaultLevel}
    >
      {children}
    </Context.Provider>
  );
};

export const Hx: React.FC<HeadingProps> = ({ children, as, ...props }) => {
  const asCtx = useContext(Context);

  return (
    <Heading as={as ?? asCtx} {...props}>
      {children}
    </Heading>
  );
};
