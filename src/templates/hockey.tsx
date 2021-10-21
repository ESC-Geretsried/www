import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Hockey: React.FC<{
  data: GatsbyTypes.GetHockeyDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { seoData, hockeyData }, pageContext }) => {
  return (
    <Layout
      content={<>{hockeyData?.title}</>}
      extra={<>extra</>}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const hockeyQuery = graphql`
  query GetHockeyData($id: String!) {
    hockeyData: wpPage(id: { eq: $id }) {
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

export default Hockey;
