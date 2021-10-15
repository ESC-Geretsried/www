import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const LineupBoard: React.FC<{
  data: GatsbyTypes.GetLineupBoardDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ pageContext }) => {
  return <Layout>Lineup</Layout>;
};

export const LineupBoardQuery = graphql`
  query GetLineupBoardData($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }

    defaultData: wpPage(id: { eq: $id }) {
      ...DefaultPageDataFields
    }
  }
`;

export default LineupBoard;
