import React from "react";
import { Layout } from "../organisms/Layout";
import { PageContext } from "../pageContext";
import { GatsbyPageContext } from "../types";

const Gamepitch: React.FC<{ pageContext: GatsbyPageContext }> = ({
  pageContext,
}) => {
  return (
    <PageContext.Provider value={pageContext}>
      <Layout>Gamepitch</Layout>
    </PageContext.Provider>
  );
};

export default Gamepitch;
