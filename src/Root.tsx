import React, { useEffect } from "react";
import { useStore } from "./store/store";
import { theme } from "./theme";
import { GatsbyPageContext } from "./types";

type RootProps = {
  pageContext: GatsbyPageContext;
};

export const Root: React.FC<RootProps> = ({ pageContext, children }) => {
  const { setSiteTitle, setIsMobileMenuOpen } = useStore();
  useEffect(() => {
    setSiteTitle(pageContext.title);
    // setIsMobileMenuOpen(false);
  }, [pageContext]);

  return <>{children}</>;
};
