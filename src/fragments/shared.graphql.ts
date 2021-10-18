import { graphql } from "gatsby";

export const defaultPageQuery = graphql`
  fragment DefaultPageDataFields on WpPage {
    content
    pageACF {
      division
      standardContent {
        ...Contact
        ...AdditionalInfo
        ...Downloads
      }
    }
  }
`;

export const Contact = graphql`
  fragment Contact on WpPage_Pageacf_StandardContent {
    contact {
      name
      email
      tel
      website
      # coach
      # assistant
      # manager
    }
  }
`;

export const AdditionalInfo = graphql`
  fragment AdditionalInfo on WpPage_Pageacf_StandardContent {
    additionalInfo {
      title
      content
    }
  }
`;

export const Downloads = graphql`
  fragment Downloads on WpPage_Pageacf_StandardContent {
    downloads {
      file {
        mediaItemUrl
        title
      }
    }
  }
`;
