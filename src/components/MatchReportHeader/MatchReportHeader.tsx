import { VisuallyHidden } from "@chakra-ui/react";
import { chakra, useMultiStyleConfig } from "@chakra-ui/system";
import React from "react";
import { useFormattedDate } from "../../utils/hooks";
import { Hx } from "../headings";

type MatchReportHeaderProps = {
  gameData: GatsbyTypes.Maybe<GatsbyTypes.MatchReportStatsFragment>;
};

export const MatchReportHeader: React.FC<MatchReportHeaderProps> = ({
  gameData,
  ...rest
}) => {
  console.log("gameData", !gameData);
  if (!gameData) {
    return null;
  }

  const styles = useMultiStyleConfig("MatchReportHeader", {});
  const gameDay = useFormattedDate(gameData.gameDay, "DD.MM.YYYY");

  return (
    <chakra.div __css={styles.container} {...rest}>
      <div>{gameDay}</div>
      <chakra.div __css={styles.borders}>
        <chakra.div __css={styles.slugs}>
          <span>{gameData.teamGuestSlug}</span>
          <span>-</span>
          <span>{gameData.teamHomeSlug}</span>
        </chakra.div>
        <Hx variant="team-names" __css={styles.teamNames}>
          <span>{gameData.teamGuest}</span>
          <VisuallyHidden>vs.</VisuallyHidden>
          <span>{gameData.teamHome}</span>
        </Hx>
      </chakra.div>
      <chakra.div __css={styles.score}>
        {gameData.scoreGuest}:{gameData.scoreHome}
      </chakra.div>
    </chakra.div>
  );
};
