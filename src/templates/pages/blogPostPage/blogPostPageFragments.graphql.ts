import { graphql } from "gatsby";

export const BlogPostFragment = graphql`
  fragment BlogPostFields on Wordpress_Post {
    date
    content
    title
    id
    uri
    featuredImage {
      node {
        altText
        title
        id
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 610, height: 300)
            }
          }
        }
      }
    }
    author {
      node {
        name
        nicename
        nickname
      }
    }
    modified
    postACF {
      division
      postCategory
      ...NormalPostFields
      ...MatchReportFields
    }
  }
`;

export const MatchReportFragment = graphql`
  fragment MatchReportFields on Wordpress_Post_Postacf {
    matchReport {
      assists
      gameDay
      penalties
      scoreGuest
      scoreHome
      scorer
      spectators
      teamGuest
      teamGuestSlug
      teamHome
      teamHomeSlug
      periodResults
      specialCase
    }
  }
`;
export const NormalPostFragment = graphql`
  fragment NormalPostFields on Wordpress_Post_Postacf {
    normalPost {
      imageGallery {
        id
        title
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 600, height: 400)
            }
          }
        }
      }
    }
  }
`;
