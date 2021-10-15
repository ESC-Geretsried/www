import { graphql } from "gatsby";

export const defaultPageQuery = graphql`
  fragment DefaultPageDataFields on WpPage {
    content
    pageACF {
      division
    }
  }
`;
