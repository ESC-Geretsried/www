import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";

const GameReport: React.FC<{
  post: GatsbyTypes.GetGameReportDataQuery["wpPost"];
}> = ({ post }) => {
  return <Layout content={<>{post?.title}</>} extra={<>extra</>} />;
};

export const GameReportQuery = graphql`
  query GetGameReportData($id: String!) {
    wpPost(id: { eq: $id }) {
      title
    }
  }
`;

export default GameReport;
