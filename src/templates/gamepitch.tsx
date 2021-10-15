import { Box } from "@chakra-ui/react";
import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";

const Gamepitch: React.FC<{ data: GatsbyTypes.GetHockeyDataQuery }> = ({
  data,
}) => {
  return (
    <Layout>
      Gamepitch<Box>{JSON.stringify(data)}</Box>
    </Layout>
  );
};

export const StandardQuery = graphql`
  query GetGamepitchData($id: String!) {
    gamepitchData: wpPage(id: { eq: $id }) {
      title
    }

    defaultData: wpPage(id: { eq: $id }) {
      ...DefaultPageDataFields
    }
  }
`;

export default Gamepitch;
