import React from "react";
import { Layout } from "../organisms/Layout";
import { GatsbyPageContext } from "../types";

const LineupBoard: React.FC<{ pageContext: GatsbyPageContext }> = ({
  pageContext,
}) => {
  return <Layout>Lineup</Layout>;
};

export default LineupBoard;
