import { graphql } from "gatsby";
import React, { useMemo } from "react";
import { Layout } from "../components/Layout/Layout";
import { GatsbyPageContext } from "../types";
import { WPContent } from "../atoms/WPContent/WPContent";
import { Heading } from "../atoms/Heading/Heading";
import { Extra } from "../components/Extra/Extra";
import { getPropertyFromGraphqlQueryObject } from "../utils/shared.utils";
import { Flex } from "@chakra-ui/react";
import { BlogPostPreview } from "../components/BlogPostList/BlogPostPreview";

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
}> = ({
  data: { newestPosts, defaultData, pageData, seoData },
  pageContext,
}) => {
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
        <>
          <Heading borders size="lg">
            News
          </Heading>
          <BlogPostPreview post={newestPosts.nodes[0]} mt={-5} mb={-4} />
          <Extra
            post={{}}
            contact={contact}
            additionalInfo={additionalInfo}
            downloads={downloads}
          />
        </>
      }
      header={<>header</>}
      seo={seoData?.pageACF?.seo}
    />
  );
};

export const StandardQuery = graphql`
  query GetStandardData($id: String!, $categorySlug: String!) {
    ...NewestPosts

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

    ...NewestPosts

    seoData: wpPage(id: { eq: $id }) {
      ...Seo
    }
  }
`;

export default Standard;
