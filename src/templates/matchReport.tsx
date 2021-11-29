import { chakra } from "@chakra-ui/system";
import { graphql } from "gatsby";
import React from "react";
import { WPContent } from "../atoms/WPContent/WPContent";
import { Hx } from "../components/headings";
import { Layout } from "../components/Layout/Layout";
import { MatchReportHeader } from "../components/MatchReportHeader/MatchReportHeader";
import { useFormattedDate } from "../utils/hooks";

const GameReport: React.FC<{
  data: GatsbyTypes.GetGameReportDataQuery;
}> = ({ data: { wpPost: post } }) => {
  console.log("post", post);
  // const gameData = post?.postACF?.matchReport as GatsbyTypes.Exact<GatsbyTypes.MatchReportStatsFragment>

  const modifiedDate = useFormattedDate(post?.modified ?? "", "DD.MM.YYYY");
  return (
    <Layout
      extra={<>extra</>}
      header={<MatchReportHeader gameData={post?.postACF?.matchReport} />}
      showHeaderOnMobile
    >
      <chakra.div
      // display="flex"
      // flexDirection="column"
      // alignItems="center"
      // maxW="41rem"
      // mx="auto"
      >
        <Hx>{post?.title}</Hx>
        <WPContent content={post?.content ?? ""} />
        <chakra.footer>{modifiedDate}</chakra.footer>
      </chakra.div>
    </Layout>
  );
};

export const GameReportQuery = graphql`
  query GetGameReportData($id: String!) {
    wpPost(id: { eq: $id }) {
      postACF {
        matchReport {
          ...MatchReportStats
        }
      }
      title
      content
      modified
    }
  }

  fragment MatchReportStats on WpPost_Postacf_MatchReport {
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
