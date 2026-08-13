import { graphql } from "gatsby";

export const PageFragment = graphql`
  fragment PageFields on Wordpress_Page {
    slug
    title
    id
    content
    uri
    content
    pageACF {
      template
      division
      ...PageACFSeoFields
      standardContent {
        ...StandardContentFields
      }
      teamContent {
        ...TeamContentFields
      }
      sponsorsContent {
        ...SponsorsContentFields
      }
      ticketsContent {
        ...TicketsContentFields
      }
      lineup {
        teamPicture {
          altText
          title
          localFile {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 900, height: 500)
              }
            }
          }
        }
        team {
          ...PlayerFields
        }
      }
      boardMembers {
        ...BoardMemberFields
      }
      gamepitchWidget
    }

    ...HomeACFFields
  }
`;

export const BlogPostPreviewFragment = graphql`
  fragment BlogPostPreviewFields on Wordpress_Post {
    title
    excerpt
    date
    id
    uri
    postACF {
      division
      postCategory
      flashPost {
        start
        end
      }
      matchReport {
        assists
        scoreGuest
        scoreHome
      }
    }
    categories {
      nodes {
        name
      }
    }
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 500, height: 200)
            }
          }
        }
      }
    }

    # categories(first: 3) {
    #   nodes {
    #     name
    #     slug
    #     databaseId
    #   }
    #   pageInfo {
    #     hasNextPage
    #   }
    # }
  }
`;

export const StandardContentFragment = graphql`
  fragment StandardContentFields on Wordpress_Page_Pageacf_StandardContent {
    pageContentTitle
    contact {
      email
      name
      tel
      website
    }
    additionalInfo {
      title
      content
    }
    downloads {
      file {
        title
        mediaItemUrl
      }
    }
    ...FeaturePicFields
  }
`;

export const TicketsContentFragment = graphql`
  fragment TicketsContentFields on Wordpress_Page_Pageacf_TicketsContent {
    standing {
      kind
      singleCost
      seasonpassCost
    }
    seating {
      kind
      singleCost
      seasonpassCost
    }
    seasonpass {
      description
      applications {
        title
        application {
          title
          mediaItemUrl
        }
      }
    }
    season
    suffix
  }
`;

export const PlayerFragment = graphql`
  fragment PlayerFields on Wordpress_Page_Pageacf_Lineup_team {
    name
    nationality
    number
    position
    rodiLink
    stickSide
    portrait {
      altText
      localFile {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 200)
          }
        }
      }
    }
  }
`;

export const BoardMemberFragment = graphql`
  fragment BoardMemberFields on Wordpress_Page_Pageacf_boardMembers {
    name
    level
    position
    email
    telephone
    portrait {
      altText
      localFile {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 200)
          }
        }
      }
    }
  }
`;

export const TeamContentFragment = graphql`
  fragment TeamContentFields on Wordpress_Page_Pageacf_TeamContent {
    teamPicture {
      altText
      title
      localFile {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 800)
          }
        }
      }
    }
    showTable
    ranking {
      ...RankingFields
    }
    team {
      teamMembers {
        ...TeamMemberFields
      }
      contact {
        coach
        assistant
        email
        manager
        telephone
      }
    }
  }
`;

export const TeamMemberFragment = graphql`
  fragment TeamMemberFields on Wordpress_Page_Pageacf_TeamContent_Team_teamMembers {
    pos
    number
    name
  }
`;

export const RankingFragment = graphql`
  fragment RankingFields on Wordpress_Page_Pageacf_TeamContent_ranking {
    team
    points
    goalsAgainst
    goals
    gamesAmount
    draws
    defeats
    wins
  }
`;

export const SponsorsContentFragment = graphql`
  fragment SponsorsContentFields on Wordpress_Page_Pageacf_sponsorsContent {
    name
    level
    url
    logo {
      altText
      title
      localFile {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 600)
          }
        }
      }
    }
  }
`;

export const SponsorsAdBannerContentFragment = graphql`
  fragment SponsorsAdBannerContentFields on Wordpress_Page_Pageacf_sponsorsContent {
    name
    level
    url
    logo {
      altText
      title
      localFile {
        childImageSharp {
          fluid(maxHeight: 35) {
            ...FluidWithWebpFields
          }
        }
      }
    }
    logoInvert {
      altText
      title
      localFile {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 35)
          }
        }
      }
    }
  }
`;

export const PageACFSeoFragment = graphql`
  fragment PageACFSeoFields on Wordpress_Page_Pageacf {
    seo {
      metaDescription
      noIndex
      ogDescription
      twitterDescription
    }
  }
`;

export const HomeACFFragment = graphql`
  fragment HomeACFFields on Wordpress_Page {
    homeACF {
      adresse
    }
  }
`;

export const FeaturePicFragment = graphql`
  fragment FeaturePicFields on Wordpress_Page_Pageacf_StandardContent {
    featurePic {
      altText
      title
      localFile {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...FluidWithWebpFields
          }
        }
      }
    }
  }
`;
