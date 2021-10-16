import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../organisms/Layout/Layout";
import { GatsbyPageContext } from "../types";

const News: React.FC<{ pageContext: GatsbyPageContext }> = ({
  pageContext,
}) => {
  return <Layout content={<>{pageContext.title}</>} extra={<>extra</>} />;
};

// export const NewsQuery = graphql`
//   query GetNewsData($id: String!) {
//     wpPage(id: { eq: $id }) {
//       title
//     }
//   }
// `;

export default News;
