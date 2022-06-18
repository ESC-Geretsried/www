import styled from "@emotion/styled";
import React, { useMemo } from "react";
import { css } from "@emotion/react";
import { navigate } from "@reach/router";
import { Maybe, SponsorsContentFieldsFragment } from "../../../graphql-types";
import { standardGrid } from "../../styles/helpers";
import { colors, fonts, grid, mq } from "../../styles/variables";
import H2 from "../h2/H2";
import Img from "../img/Img";
import AspectRatioContainer from "../aspectRatioContainer/AspectRatioContainer";
import Button from "../button/Button";

const StyledH2 = styled(H2)`
  grid-column: 1 / -1;
  ${mq[2]} {
    /* grid-column: 1 / span 3; */
    width: auto;
    justify-self: center;
  }
`;

const Section = styled.section`
  ${standardGrid}
  grid-column: 1 / -1;
  margin-bottom: 10%;
`;

const SponsorName = styled.span`
  padding-top: 1em;
  font-family: ${fonts.rubikBold};
`;

const SponsorsWrapper = styled.div`
  display: grid;
  gap: ${grid.gap};
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 1fr;
  grid-column: 1 / -1;

  ${mq[2]} {
    grid-template-columns: repeat(12, 1fr);
    grid-column: 2 / span 8;
  }
`;

const LogoWrapper = styled(AspectRatioContainer)`
  background-color: ${colors.white};
  /* padding: 1.2em; */
  height: 100%;
  display: flex;
  align-items: center;
  /* position: relative; */
  .gatsby-image-wrapper {
    min-width: 100%;
    max-height: 100% !important;
    /* picture img {
      object-fit: contain !important;
    } */
  }

  transition: transform 0.1s ease-in;

  &:hover {
    transform: scale3d(1.025, 1.025, 1.025);
  }
`;

const OneByOneColumn = css`
  grid-column: span 2;
`;
const OneByTwoColumn = css`
  grid-column: span 4;
`;

const SponsorSection: React.FC<{
  sponsors: Array<Maybe<SponsorsContentFieldsFragment>>;
  silverCount?: number;
  bronceCount?: number;
  link?: boolean;
}> = ({ sponsors, silverCount = 9, bronceCount = 9, link = true }) => {
  const { goldSponsors, silverSponsors, bronceSponsors } = useMemo(() => {
    const goldSponsors = sponsors.filter((sponsor) => sponsor?.level === "gold"); // .sort(() => 0.5 - Math.random())
    const silverSponsors = sponsors.filter((sponsor) => sponsor?.level === "silver"); // .slice(0, silverCount);
    const bronceSponsors = sponsors.filter((sponsor) => sponsor?.level === "bronce").slice(0, bronceCount);

    return {
      goldSponsors,
      silverSponsors,
      bronceSponsors,
    };
  }, [bronceCount, sponsors]);

  return (
    <>
      <Section>
        <StyledH2 title="Gold Partner" />
        <SponsorsWrapper>
          {goldSponsors.map((sponsor) => {
            if (!sponsor?.name) {
              return null;
            }

            return (
              <div
                key={sponsor.name}
                css={
                  (sponsor.logo?.localFile?.childImageSharp?.fluid?.aspectRatio ?? 1) > 1.5
                    ? OneByTwoColumn
                    : OneByOneColumn
                }
              >
                <a href={sponsor.url ?? "/nicht-gefunden"} target="_blank" rel="noreferrer">
                  <LogoWrapper
                    ratio={(sponsor.logo?.localFile?.childImageSharp?.fluid?.aspectRatio ?? 1) > 1.6 ? 0.5 : 1}
                  >
                    <Img
                      fluid={sponsor.logo?.localFile?.childImageSharp?.fluid}
                      alt={sponsor.logo?.altText ?? "Sponsor Logo"}
                      title={sponsor.logo?.title ?? "Sponsor Name"}
                    />
                  </LogoWrapper>
                </a>
                <div
                  css={css`
                    padding-top: 0.5em;
                  `}
                >
                  <SponsorName>{sponsor.name}</SponsorName>
                </div>
              </div>
            );
          })}
        </SponsorsWrapper>
      </Section>

      <Section>
        <StyledH2 title="Silber Partner" />
        <SponsorsWrapper>
          {silverSponsors.map((sponsor) => {
            if (!sponsor?.name) {
              return null;
            }

            return (
              <div
                css={
                  (sponsor.logo?.localFile?.childImageSharp?.fluid?.aspectRatio ?? 1) > 1.5
                    ? OneByTwoColumn
                    : OneByOneColumn
                }
                key={sponsor.name}
              >
                <a href={sponsor.url ?? "/nicht-gefunden"} target="_blank" rel="noreferrer">
                  <LogoWrapper
                    ratio={(sponsor.logo?.localFile?.childImageSharp?.fluid?.aspectRatio ?? 1) > 1.5 ? 0.5 : 1}
                  >
                    <Img
                      fluid={sponsor.logo?.localFile?.childImageSharp?.fluid}
                      alt={sponsor.logo?.altText ?? "Sponsor Logo"}
                      title={sponsor.logo?.title ?? "Sponsor Name"}
                    />
                  </LogoWrapper>
                </a>
                <div
                  css={css`
                    padding-top: 0.5em;
                  `}
                >
                  <SponsorName>{sponsor.name}</SponsorName>
                </div>
              </div>
            );
          })}
        </SponsorsWrapper>
      </Section>
      {bronceCount > 0 && (
        <Section>
          <StyledH2 title="Bronze Partner" />
          <SponsorsWrapper>
            {bronceSponsors.map((sponsor) => {
              if (!sponsor?.name) {
                return null;
              }

              return (
                <div
                  key={sponsor.name}
                  css={
                    (sponsor.logo?.localFile?.childImageSharp?.fluid?.aspectRatio ?? 1) > 1.5
                      ? OneByTwoColumn
                      : OneByOneColumn
                  }
                >
                  <a href={sponsor.url ?? "/nicht-gefunden"} target="_blank" rel="noreferrer">
                    <LogoWrapper
                      ratio={(sponsor.logo?.localFile?.childImageSharp?.fluid?.aspectRatio ?? 1) > 1.5 ? 0.5 : 1}
                      css={css`
                        padding: 0.5em;
                      `}
                    >
                      <Img
                        fluid={sponsor.logo?.localFile?.childImageSharp?.fluid}
                        alt={sponsor.logo?.altText ?? "Sponsor Logo"}
                        title={sponsor.logo?.title ?? "Sponsor Name"}
                      />
                    </LogoWrapper>
                  </a>
                </div>
              );
            })}
          </SponsorsWrapper>
        </Section>
      )}
      {link && (
        <div
          css={css`
            grid-column: 1 /-1;
            display: flex;
            justify-content: center;
            text-align: center;
            padding-bottom: 1.75rem;
          `}
        >
          <Button onClick={async () => navigate("/sponsoring")}>
            {/* <Link to="/sponsoring"> */}
            Alle Partner
            {/* </Link> */}
          </Button>
        </div>
      )}
    </>
  );
};

export default SponsorSection;
