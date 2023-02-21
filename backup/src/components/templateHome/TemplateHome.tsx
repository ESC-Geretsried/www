import { css } from "@emotion/react";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { SponsorPreviewQuery } from "../../../graphql-types";
import H1 from "../h1/H1";
import BaseSection from "../sections/BaseSection";
import SponsorSection from "../sections/SponsorsSection";
import FlashNews from "./FlashNews";
import Calender from "./Calender";
import BlogPreview from "./BlogPreview";

const TemplateHome: React.FC = () => {
  const sponsorData = useStaticQuery<SponsorPreviewQuery>(graphql`
    query SponsorPreview {
      wordpressPage(id: { eq: "cG9zdDoxODk=" }) {
        pageACF {
          sponsorsContent {
            ...SponsorsContentFields
          }
        }
      }
    }
  `);

  const sponsors = sponsorData.wordpressPage?.pageACF?.sponsorsContent;

  return (
    <>
      <FlashNews />
      <BaseSection size="half">
        <BlogPreview />
      </BaseSection>
      <BaseSection size="half">
        <Calender />
      </BaseSection>
      <H1
        title="Sponsoren"
        size="section"
        css={css`
          margin-top: 10em;
        `}
      />
      {sponsors && <SponsorSection sponsors={sponsors} bronceCount={0} />}
    </>
  );
};

export default TemplateHome;
