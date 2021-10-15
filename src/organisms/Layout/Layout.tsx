import React from "react";
import { Nav } from "../Nav/Nav";
import { ContentGrid } from "../../atoms/Grid/ContentGrid";
import { Adbanner } from "../../molecules/Adbanner/Adbanner";
import { Container } from "./Container";
import { Main } from "./Main";
import { useStore } from "../../store/store";

export const Layout: React.FC = ({ children }) => {
  const store = useStore();
  return (
    <>
      <Adbanner sponsors={[]} />
      <Container>
        <Nav />
        <Main>
          <ContentGrid>
            <div style={{ gridColumn: "1 /-1" }}>
              {children}
              <div>{JSON.stringify(store)}</div>
              <footer>footer</footer>
            </div>
          </ContentGrid>
        </Main>
      </Container>
    </>
  );
};
