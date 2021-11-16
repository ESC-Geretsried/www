import React from "react";
import { Nav } from "../Nav/Nav";
import { ContentGrid } from "../../atoms/Grid/ContentGrid";
import { MainContent } from "../../atoms/Grid/MainContent";
import { ExtraContent } from "../../atoms/Grid/ExtraContent";
import { Adbanner } from "../../components/Adbanner/Adbanner";
import { Main } from "./Main";
import { Flex } from "@chakra-ui/layout";
import { Seo } from "../../atoms/Seo/Seo";
import { useStore } from "../../store/store";
import { Box, chakra } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { HeadingLevelBoundary } from "../headings";

export const Layout: React.FC<{
  content: React.ReactElement;
  extra?: React.ReactElement;
  header: React.ReactElement;
  seo?: GatsbyTypes.SeoFieldsFragment;
}> = ({ content, extra, header, seo }) => {
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
            display={{ base: "none", xl: "flex" }}
          >
            {header}
          </Flex>
          <HeadingLevelBoundary>
            {extra && <ExtraContent>{extra}</ExtraContent>}
            <MainContent fullWidth={!Boolean(extra)}>{content}</MainContent>

            <Footer />
          </HeadingLevelBoundary>
        </Main>
      </ContentGrid>
    </>
  );
};
