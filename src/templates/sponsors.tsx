import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout";
import { PageContext } from "../pageContext";
import { GatsbyPageContext } from "../types";

const Sponsors: React.FC<{
  data: GatsbyTypes.GetSponsorsDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data, pageContext }) => {
  return (
    <PageContext.Provider value={pageContext}>
      <Layout>{data?.wpPage?.title}</Layout>
    </PageContext.Provider>
  );
};

export const SponsorsQuery = graphql`
  query GetSponsorsData($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
  }
`;

export default Sponsors;
