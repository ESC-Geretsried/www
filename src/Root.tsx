import React, { useEffect } from "react";
import { useStore } from "./store/store";
import { theme } from "./theme";
import { GatsbyPageContext } from "./types";

type RootProps = {
  pageContext: GatsbyPageContext;
};

export const Root: React.FC<RootProps> = ({ pageContext, children }) => {
  const { setSiteTitle, setPathname } = useStore();
  useEffect(() => {
    setSiteTitle(pageContext.title);
    setPathname(pageContext.pathname);
  }, [pageContext]);

  return <>{children}</>;
};
