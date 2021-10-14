import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout";
import { GatsbyPageContext } from "../types";

const Lineup: React.FC<{
  data: GatsbyTypes.GetLineupDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data, pageContext }) => {
  return <Layout>{data?.wpPage?.title}</Layout>;
};

export const LineupQuery = graphql`
  query GetLineupData($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
  }
`;

export default Lineup;
