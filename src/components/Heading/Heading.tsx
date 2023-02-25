"use client";

import * as React from "react";
import { useContext, createContext, useMemo } from "react";

const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const defaultLevel = "h1";

type HeadingLevel = typeof headingLevels[number];

const Context = createContext<HeadingLevel>(defaultLevel);

const useIncreasedContextLevel = (increase = 1) => {
  const levelFromContext = useContext(Context);

  return useMemo(() => {
    const index = headingLevels.indexOf(levelFromContext);
    const newIndex = index + increase;

    if (newIndex >= headingLevels.length) {
      return headingLevels[headingLevels.length - 1]; // cap at h6
    }

    return headingLevels[newIndex];
  }, [increase, levelFromContext]);
};

export const HeadingLevelBoundary: React.FC<{
  level?: HeadingLevel;
  children?: React.ReactNode;
}> = ({ level, children }) => {
  const increasedLevelFromContext = useIncreasedContextLevel(1);

  return (
    <Context.Provider
      value={level ?? increasedLevelFromContext ?? defaultLevel}
    >
      {children}
    </Context.Provider>
  );
};

const Heading = ({
  as,
  children,
  ...props
}: { as: HeadingLevel; children?: React.ReactNode } & Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "children"
>) => {
  return React.createElement(as, props, children);
};

export const Hx: React.FC<{
  children?: React.ReactNode;
  as?: HeadingLevel;
  increment?: number;
  className?: string;
}> = ({ children, as, increment = 0, ...props }) => {
  const asCtx = useIncreasedContextLevel(increment);

  return (
    <Heading as={as ?? asCtx} {...props}>
      {children}
    </Heading>
  );
};

// 🔬 jest unit tested
