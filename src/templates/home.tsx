import { Box } from "@chakra-ui/layout";
import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const Home: React.FC<{
  data: GatsbyTypes.GetHomeDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { homeData }, pageContext }) => {
  return <Layout>{homeData?.title}</Layout>;
};

export const HomeQuery = graphql`
  query GetHomeData($id: String!) {
    homeData: wpPage(id: { eq: $id }) {
      title
    }
  }
`;

export default Home;
