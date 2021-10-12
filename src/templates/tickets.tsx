import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout";
import { PageContext } from "../pageContext";
import { GatsbyPageContext } from "../types";

const Tickets: React.FC<{
  data: GatsbyTypes.GetTicketsDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data, pageContext }) => {
  return (
    <PageContext.Provider value={pageContext}>
      <Layout>{data?.wpPage?.title}</Layout>
    </PageContext.Provider>
  );
};

export const TicketsQuery = graphql`
  query GetTicketsData($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
  }
`;

export default Tickets;
