import { Box } from "@chakra-ui/react";
import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";

const Gamepitch: React.FC<{ data: GatsbyTypes.GetGamepitchDataQuery }> = ({
  data: { gamepitchData, defaultData, seoData },
}) => {
  return (
    <Layout
      content={
        <>
          Gamepitch<Box>{JSON.stringify(gamepitchData)}</Box>
        </>
      }
      extra={<>extra</>}
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
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
    seoData: wpPage(id: { eq: $id }) {
      ...Seo
    }
  }
`;

export default Gamepitch;
