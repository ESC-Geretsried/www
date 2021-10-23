import { graphql } from "gatsby";
import React, { useMemo } from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";
import { WPContent } from "../atoms/WPContent/WPContent";
import { Heading } from "../atoms/Heading/Heading";
import { Extra } from "../organisms/Extra/Extra";
import { getPropertyFromGraphqlQueryObject } from "../utils/shared.utils";
import { Flex } from "@chakra-ui/react";

const useDefaultData = (
  defaultData: GatsbyTypes.DefaultPageDataFieldsFragment
) => {
  return useMemo(() => {
    const contact = getPropertyFromGraphqlQueryObject<
      GatsbyTypes.ContactFragment,
      "contact"
    >(defaultData.pageACF?.standardContent, "contact");

    const additionalInfo = getPropertyFromGraphqlQueryObject<
      GatsbyTypes.AdditionalInfoFragment,
      "additionalInfo"
    >(defaultData?.pageACF?.standardContent, "additionalInfo");

    const downloads = getPropertyFromGraphqlQueryObject<
      GatsbyTypes.DownloadsFragment,
      "downloads"
    >(defaultData?.pageACF?.standardContent, "downloads");

    return {
      contact,
      additionalInfo,
      downloads,
    };
  }, [defaultData]);
};

const Standard: React.FC<{
  data: GatsbyTypes.GetStandardDataQuery;
  pageContext: GatsbyPageContext;
}> = ({ data: { defaultData, pageData, seoData }, pageContext }) => {
  if (!defaultData?.content) {
    return null;
  }

  const pageACF = pageData?.pageACF;
  const { contact, additionalInfo, downloads } = useDefaultData(defaultData);

  return (
    <Layout
      content={
        <>
          <Flex justifyContent="center">
            <Heading borders marginBlockEnd={6}>
              {pageACF?.standardContent?.pageContentTitle}
            </Heading>
          </Flex>
          <WPContent content={defaultData.content} />
        </>
      }
      extra={
        <Extra
          post={{}}
          contact={contact}
          additionalInfo={additionalInfo}
          downloads={downloads}
        />
      }
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const StandardQuery = graphql`
  query GetStandardData($id: String!) {
    pageData: wpPage(id: { eq: $id }) {
      title
      pageACF {
        standardContent {
          pageContentTitle
        }
      }
    }

    defaultData: wpPage(id: { eq: $id }) {
      ...DefaultPageDataFields
    }
    seoData: wpPage(id: { eq: $id }) {
      ...Seo
    }
  }
`;

export default Standard;
