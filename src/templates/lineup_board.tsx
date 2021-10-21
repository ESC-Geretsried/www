import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const LineupBoard: React.FC<{
  data: GatsbyTypes.GetLineupBoardDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { seoData }, pageContext }) => {
  return (
    <Layout
      content={<>Lineup</>}
      extra={<>extra</>}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const LineupBoardQuery = graphql`
  query GetLineupBoardData($id: String!) {
    wpPage(id: { eq: $id }) {
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

export default LineupBoard;
