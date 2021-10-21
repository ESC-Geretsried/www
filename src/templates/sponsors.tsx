import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Sponsors: React.FC<{
  data: GatsbyTypes.GetSponsorsDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { sponsorsData, seoData }, pageContext }) => {
  return (
    <Layout
      content={<>{sponsorsData.title}</>}
      extra={<>extra</>}
      header={<>header</>}
      seo={seoData.pageACF.seo}
    />
  );
};

export const SponsorsQuery = graphql`
  query GetSponsorsData($id: String!) {
    sponsorsData: wpPage(id: { eq: $id }) {
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

export default Sponsors;
