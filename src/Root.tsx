import { Box } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { useStore } from "./store/store";
import { GatsbyPageContext } from "./types";
import { DuoToneFilter } from "./utils/DuoToneFilter";

type RootProps = {
  pageContext: GatsbyPageContext;
};
export const Root: React.FC<RootProps> = ({ pageContext, children }) => {
  const { setSiteTitle, setPathname } = useStore();
  useEffect(() => {
    setSiteTitle(pageContext.title);
    setPathname(pageContext.pathname);
  }, [pageContext]);

  return (
    <>
      <DuoToneFilter />
      <Box>{children}</Box>
    </>
  );
};
