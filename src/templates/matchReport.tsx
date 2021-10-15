import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";

const GameReport: React.FC<{
  post: GatsbyTypes.GetGameReportDataQuery["wpPost"];
}> = ({ post }) => {
  return (
    <Layout>
      <h1>{post?.title}</h1>
    </Layout>
  );
};

export const GameReportQuery = graphql`
  query GetGameReportData($id: String!) {
    wpPost(id: { eq: $id }) {
      title
    }
  }
`;

export default GameReport;
