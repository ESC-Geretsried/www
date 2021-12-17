import React from "react";
import { ContentGrid } from "../../atoms/Grid/ContentGrid";
import { MainContent } from "../../atoms/Grid/MainContent";
import { ExtraContent } from "../../atoms/Grid/ExtraContent";
import { Main } from "./Main";
import { Flex } from "@chakra-ui/layout";
import { Seo } from "../../atoms/Seo/Seo";
import { useStore } from "../../store/store";
import { Footer } from "./Footer";
import { HeadingLevelBoundary } from "../headings";
import { Adbanner } from "../Adbanner/Adbanner";
import { Nav } from "../Nav/Nav";
// import "./headCt.css";

export const Layout: React.FC<{
  extra?: React.ReactElement;
  header: React.ReactElement;
  seo?: GatsbyTypes.SeoFieldsFragment;
  showHeaderOnMobile?: boolean;
}> = ({ extra, header, seo, showHeaderOnMobile = false, children }) => {
  const store = useStore();
  const { siteTitle, pathname } = store;

  return (
    <>
      <Seo title={siteTitle} uri={pathname} seo={seo} />
      <ContentGrid>
        <Nav />
        <Adbanner sponsors={[]} />
        <Main>
          <Flex
            as="header"
            justifyContent="center"
            gridColumn="1 / -1"
            display={showHeaderOnMobile ? "flex" : { base: "none", xl: "flex" }}
          >
            {header}
          </Flex>
          <HeadingLevelBoundary>
            {extra && <ExtraContent>{extra}</ExtraContent>}
            <MainContent fullWidth={!Boolean(extra)}>{children}</MainContent>

            <Footer />
          </HeadingLevelBoundary>
        </Main>
      </ContentGrid>
    </>
  );
};
