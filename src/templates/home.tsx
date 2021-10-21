import { Box } from "@chakra-ui/layout";
import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Home: React.FC<{
  data: GatsbyTypes.GetHomeDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { homeData, seoData }, pageContext }) => {
  return (
    <Layout
      content={<>{homeData?.title}</>}
      extra={<>extra</>}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const HomeQuery = graphql`
  query GetHomeData($id: String!) {
    homeData: wpPage(id: { eq: $id }) {
      title
    }
    seoData: wpPage(id: { eq: $id }) {
      ...Seo
    }
  }
`;

export default Home;
