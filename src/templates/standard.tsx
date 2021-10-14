import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout";
import { GatsbyPageContext } from "../types";

const Standard: React.FC<{
  data: GatsbyTypes.GetStandardDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data, pageContext }) => {
  return <Layout>{data?.wpPage?.title}</Layout>;
};

export const StandardQuery = graphql`
  query GetStandardData($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
  }
`;

export default Standard;
