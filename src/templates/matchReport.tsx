import { graphql } from "gatsby";
import React from "react";
import { Layout } from "../components/Layout/Layout";

const GameReport: React.FC<{
  data: GatsbyTypes.GetGameReportDataQuery;
}> = ({ data: { wpPost: post } }) => {
  console.log("post", post);
  return (
    <Layout
      content={<pre>blub{JSON.stringify(post, null, 2)}</pre>}
      extra={<>extra</>}
      header={<>header</>}
    />
  );
};

export const GameReportQuery = graphql`
  query GetGameReportData($id: String!) {
    wpPost(id: { eq: $id }) {
      postACF {
        matchReport {
          ...WpPost_Postacf_MatchReportFragment
        }
      }
      title
      modified
    }
  }

  fragment WpPost_Postacf_MatchReportFragment on WpPost_Postacf_MatchReport {
    assists
    gameDay
    penalties
    periodResults
    scoreGuest
    scoreHome
    scorer
    specialCase
    spectators
    teamGuest
    teamGuestSlug
    teamHome
    teamHomeSlug
  }
`;

export default GameReport;
