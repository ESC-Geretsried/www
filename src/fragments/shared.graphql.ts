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
        mimeType
        mediaType
      }
    }
  }
`;

export const NewestPosts = graphql`
  fragment NewestPosts on Query {
    newestPosts: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { slug: { eq: $categorySlug } } } }
      }
      limit: 1
    ) {
      nodes {
        ...BlogPostPreviewFields
      }
    }
  }
`;

export const MenuItems = graphql`
  fragment MenuItem on WpMenuItem {
    id
    label
    url
    parentId
    childItems {
      nodes {
        ...MenuChildItem
      }
    }
  }

  fragment MenuChildItem on WpMenuItem {
    id
    label
    url
  }
`;
