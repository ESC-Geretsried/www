import React from "react";
import { Layout } from "../organisms/Layout";
import { GatsbyPageContext } from "../types";

const News: React.FC<{ pageContext: GatsbyPageContext }> = ({
  pageContext,
}) => {
  return <Layout>News</Layout>;
};

export default News;
