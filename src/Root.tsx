import { Box } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <noscript>{JSON.stringify({ pageContext }, null, 2)}</noscript>
      </Helmet>
      <DuoToneFilter />
      <Box>{children}</Box>
    </>
  );
};
