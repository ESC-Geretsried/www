import React from "react";
import { Layout } from "../organisms/Layout";
import { PageContext } from "../pageContext";
import { GatsbyPageContext } from "../types";

const LineupBoard: React.FC<{ pageContext: GatsbyPageContext }> = ({
  pageContext,
}) => {
  return (
    <PageContext.Provider value={pageContext}>
      <Layout>Lineup</Layout>
    </PageContext.Provider>
  );
};

export default LineupBoard;
