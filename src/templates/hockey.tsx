import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout";
import { GatsbyPageContext } from "../types";

const Hockey: React.FC<{
  data: GatsbyTypes.GetHockeyDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data, pageContext }) => {
  return <Layout>{data?.wpPage?.title}</Layout>;
};

export const hockeyQuery = graphql`
  query GetHockeyData($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
  }
`;

export default Hockey;
