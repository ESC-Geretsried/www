import React from "react";
import { Nav } from "../Nav/Nav";
import { ContentGrid } from "../../atoms/Grid/ContentGrid";
import { MainContent } from "../../atoms/Grid/MainContent";
import { ExtraContent } from "../../atoms/Grid/ExtraContent";
import { Adbanner } from "../../molecules/Adbanner/Adbanner";
import { Container } from "./Container";
import { Main } from "./Main";
import { Flex } from "@chakra-ui/layout";
import { Seo } from "../../atoms/Seo/Seo";
import { useStore } from "../../store/store";

export const Layout: React.FC<{
  content: React.ReactElement;
  extra: React.ReactElement;
  header: React.ReactElement;
  seo?: GatsbyTypes.SeoFieldsFragment;
}> = ({ content, extra, header, seo }) => {
  const store = useStore();
  const { siteTitle, pathname } = store;
  return (
    <>
      <Seo title={siteTitle} uri={pathname} seo={seo} />
      <Adbanner sponsors={[]} display={{ base: "none", md: "block" }} />
      <Container>
        <Nav />
        <Adbanner sponsors={[]} display={{ base: "block", md: "none" }} />
        <Main>
          <ContentGrid>
            <Flex as="header" justifyContent="center" gridColumn="1 / -1">
              {header}
            </Flex>
            <ExtraContent>{extra}</ExtraContent>
            <MainContent>
              {content}
              <footer>
                footer<pre>{JSON.stringify(store, null, 4)}</pre>
              </footer>
            </MainContent>
          </ContentGrid>
        </Main>
      </Container>
    </>
  );
};
