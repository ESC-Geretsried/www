import { graphql } from "gatsby";
import React from "react";
import { PageContext } from "../pageContext";
import { Layout } from "../organisms/Layout";
import { GatsbyPageContext } from "../types";

const Hockey: React.FC<{
  data: GatsbyTypes.GetHockeyDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data, pageContext }) => {
  return (
    <PageContext.Provider value={pageContext}>
      <Layout>{data?.wpPage?.title}</Layout>
    </PageContext.Provider>
  );
};

export const hockeyQuery = graphql`
  query GetHockeyData($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
  }
`;

export default Hockey;
