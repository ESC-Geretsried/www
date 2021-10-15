import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";
import { WPContent } from "../atoms/WPContent/WPContent";

const Standard: React.FC<{
  data: GatsbyTypes.GetStandardDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { defaultData, standardData }, pageContext }) => {
  if (!defaultData?.content) {
    return null;
  }

  return (
    <Layout>
      {standardData?.title}
      <WPContent content={defaultData.content} />
    </Layout>
  );
};

export const StandardQuery = graphql`
  query GetStandardData($id: String!) {
    standardData: wpPage(id: { eq: $id }) {
      title
    }

    defaultData: wpPage(id: { eq: $id }) {
      ...DefaultPageDataFields
    }
  }
`;

export default Standard;
