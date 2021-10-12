import React from "react";
import { Layout } from "../organisms/Layout";
import { PageContext } from "../pageContext";
import { GatsbyPageContext } from "../types";

const News: React.FC<{ pageContext: GatsbyPageContext }> = ({
  pageContext,
}) => {
  return (
    <PageContext.Provider value={pageContext}>
      <Layout>News</Layout>
    </PageContext.Provider>
  );
};

export default News;
