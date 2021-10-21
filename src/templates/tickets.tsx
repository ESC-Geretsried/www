import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Tickets: React.FC<{
  data: GatsbyTypes.GetTicketsDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { ticketsData, seoData }, pageContext }) => {
  return (
    <Layout
      content={<> {ticketsData.title}</>}
      extra={<>extra</>}
      header={<>header</>}
      seo={seoData.pageACF.seo}
    ></Layout>
  );
};

export const TicketsQuery = graphql`
  query GetTicketsData($id: String!) {
    ticketsData: wpPage(id: { eq: $id }) {
      title
    }

    defaultData: wpPage(id: { eq: $id }) {
      ...DefaultPageDataFields
    }
    seoData: wpPage(id: { eq: $id }) {
      ...Seo
    }
  }
`;

export default Tickets;
