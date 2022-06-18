import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import { css } from "@emotion/react";
import { useStaticQuery, graphql } from "gatsby";
import { colors, dimensions, breakpoints } from "../../styles/variables";
import Img from "../img/Img";
import { AdBannerQuery, SponsorsAdBannerContentFieldsFragment } from "../../../graphql-types";
import { AdbannerImageWrapper, AdBannerWrapper, AdLink, SponsorName } from "./AdBanner.styles";

const AdBanner: React.FC = () => {
  const sponsorData = useStaticQuery<AdBannerQuery>(graphql`
    query AdBanner {
      wordpressPage(id: { eq: "cG9zdDoxODk=" }) {
        pageACF {
          sponsorsContent {
            ...SponsorsAdBannerContentFields
          }
        }
      }
    }
  `);

  const allSponsors =
    sponsorData.wordpressPage?.pageACF?.sponsorsContent ?? ([] as Array<SponsorsAdBannerContentFieldsFragment>);

  const [goldSponsors, setGoldSponsors] = useState<Array<SponsorsAdBannerContentFieldsFragment>>([]);

  useEffect(() => {
    setGoldSponsors(
      allSponsors.filter(
        (sponsor): sponsor is SponsorsAdBannerContentFieldsFragment =>
          sponsor !== undefined && sponsor?.level === "gold",
      ),
    );
  }, [allSponsors]);

  return (
    <AdBannerWrapper>
      <Carousel
        autoplay
        dots={false}
        slidesToShow={1}
        responsive={[
          {
            breakpoint: 5000,
            settings: {
              slidesToShow: goldSponsors.length < 4 ? goldSponsors.length : 4,
            },
          },
          {
            breakpoint: breakpoints.xl,
            settings: {
              slidesToShow: goldSponsors.length < 2 ? goldSponsors.length : 2,
            },
          },
          {
            breakpoint: breakpoints.sm,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {goldSponsors.map((sponsor) => {
          if (sponsor.name === null || sponsor.name === undefined) {
            return null;
          }

          const logoImg = sponsor?.logo;
          const logoInvertImg = sponsor?.logoInvert;

          const aspectRatio =
            logoInvertImg?.localFile?.childImageSharp?.fluid?.aspectRatio ??
            logoImg?.localFile?.childImageSharp?.fluid?.aspectRatio;

          return (
            <AdLink key={sponsor.name} href={sponsor?.url ?? "www.esc-geretsried.de"} target="_blank" rel="noreferrer">
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  min-height: 2rem;
                  padding: ${dimensions.containerPadding / 2}rem ${dimensions.containerPadding}rem;
                `}
              >
                <SponsorName>{sponsor.name}</SponsorName>
                <div
                  css={css`
                    min-width: ${dimensions.border.size.normal};
                    height: 2rem;
                    background-color: ${colors.gray.line};
                    margin: 0 1rem;
                  `}
                />
                <AdbannerImageWrapper aspectRatio={aspectRatio ?? 1}>
                  <Img
                    fluid={
                      logoInvertImg?.localFile?.childImageSharp?.fluid ?? logoImg?.localFile?.childImageSharp?.fluid
                    }
                    alt={logoInvertImg?.altText ?? logoImg?.altText ?? "Sponsoren Logo"}
                    title={logoInvertImg?.title ?? logoImg?.title ?? "Sponsoren Logo"}
                  />
                </AdbannerImageWrapper>
              </div>
            </AdLink>
          );
        })}
      </Carousel>
    </AdBannerWrapper>
  );
};

export default AdBanner;
