import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Lineup: React.FC<{
  data: GatsbyTypes.GetLineupDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { lineupData, seoData }, pageContext }) => {
  return (
    <Layout
      content={<>{lineupData?.title}</>}
      extra={<>extra</>}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const LineupQuery = graphql`
  query GetLineupData($id: String!) {
    lineupData: wpPage(id: { eq: $id }) {
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

export default Lineup;
