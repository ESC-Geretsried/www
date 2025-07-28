import React from "react";
import { PageFieldsFragment } from "../../../graphql-types";
import FeatureImg from "../featureImg/FeatureImg";
import { PlayersWrapper, Section, StyledH2 } from "./lineup.styles";
import BoardMemberCard from "./BoardMemberCard";
import PlayerCard from "./PlayerCard";

const TemplateLineup: React.FC<{ data: PageFieldsFragment }> = ({ data }) => {
  const lineup = data.pageACF?.lineup?.team;
  const allBoardMembers = data.pageACF?.boardMembers;
  const featureImg = data.pageACF?.lineup?.teamPicture;

  if (lineup === null && allBoardMembers === null) {
    return null;
  }
  const active = lineup?.filter((human) => human?.position !== "inactive");

  const goalies = active?.filter((human) => human?.position === "goalie");
  const defense = active?.filter((human) => human?.position === "defense");
  const offense = active?.filter((human) => human?.position === "offense");
  const team = active?.filter(
    (human) => human?.position !== "offense" && human?.position !== "defense" && human?.position !== "goalie",
  );
  const president = allBoardMembers?.filter((human) => human?.level === "president");
  const boardMembers = allBoardMembers?.filter((human) => human?.level === "board");
  const organisationStaff = allBoardMembers?.filter((human) => human?.level === "organisation");
  const staff = allBoardMembers?.filter((human) => human?.level === "staff");

  return (
    <>
      {featureImg && (
        <FeatureImg
          img={featureImg.localFile?.childImageSharp ?? undefined}
          alt={featureImg.altText ?? "Default Alt"}
          title={featureImg.title ?? "Default Title"}
        />
      )}
      {Array.isArray(goalies) && goalies.length > 0 && (
        <Section size="full">
          <StyledH2 title="Tor" />
          <PlayersWrapper>
            {goalies.map((human) => {
              if (!human?.name || !human.number) {
                return null;
              }

              return <PlayerCard human={human} key={human.name + human.number} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
      {Array.isArray(defense) && defense.length > 0 && (
        <Section size="full">
          <StyledH2 title="Verteidigung" />
          <PlayersWrapper>
            {defense.map((human) => {
              if (!human?.name || !human.number) {
                return null;
              }

              return <PlayerCard human={human} key={human.name + human.number} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
      {Array.isArray(offense) && offense.length > 0 && (
        <Section size="full">
          <StyledH2 title="Sturm" />
          <PlayersWrapper>
            {offense.map((human) => {
              if (!human?.name || !human.number) {
                return null;
              }

              return <PlayerCard human={human} key={human.name + human.number} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
      {Array.isArray(team) && team.length > 0 && (
        <Section size="full">
          <StyledH2 title="Team" />
          <PlayersWrapper>
            {team.map((human) => {
              if (!human?.name) {
                return null;
              }

              return <PlayerCard notPlayer human={human} key={human.name} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
      {Array.isArray(president) && president.length > 0 && (
        <Section size="full">
          <StyledH2 title="Präsident" />
          <PlayersWrapper>
            {president.map((human) => {
              if (!human?.name || !human.position) {
                return null;
              }

              return <BoardMemberCard key={human.name + human.position} human={human} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
      {Array.isArray(boardMembers) && boardMembers.length > 0 && (
        <Section size="full">
          <StyledH2 title="Vorstand" />
          <PlayersWrapper>
            {boardMembers.map((human) => {
              if (!human?.name || !human.position) {
                return null;
              }

              return <BoardMemberCard key={human.name + human.position} human={human} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
      {Array.isArray(organisationStaff) && organisationStaff.length > 0 && (
        <Section size="full">
          <StyledH2 title="Organisation" />
          <PlayersWrapper>
            {organisationStaff.map((human) => {
              if (!human?.name || !human.position) {
                return null;
              }

              return <BoardMemberCard key={human.name + human.position} human={human} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
      {Array.isArray(staff) && staff.length > 0 && (
        <Section size="full">
          <StyledH2 title="Mitarbeiter" />
          <PlayersWrapper>
            {staff.map((human) => {
              if (!human?.name || !human.position) {
                return null;
              }

              return <BoardMemberCard key={human.name + human.position} human={human} />;
            })}
          </PlayersWrapper>
        </Section>
      )}
    </>
  );
};

export default TemplateLineup;
