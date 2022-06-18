import React from "react";
import { css } from "@emotion/react";
import { PageFieldsFragment, SponsorsContentFieldsFragment } from "../../../graphql-types";
import BaseSection from "../sections/BaseSection";
import WPContentContainer from "../wpContentContainer/WPContentContainer";
import SponsorSection from "../sections/SponsorsSection";
import { mq } from "../../styles/variables";

const TemplateSponsoring: React.FC<{ data: PageFieldsFragment }> = ({ data }) => {
  const allSponsors = (data.pageACF?.sponsorsContent ?? []) as Array<SponsorsContentFieldsFragment>;

  return (
    <>
      <BaseSection
        size="big"
        css={css`
          ${mq[2]} {
            grid-column: 3 / span 6 !important;
          }
        `}
      >
        <WPContentContainer
          wpContent={data.content && data.content !== "" ? data.content : "Hier Steht wie man Sponsor wird!"}
        />
      </BaseSection>
      <SponsorSection
        sponsors={allSponsors}
        silverCount={allSponsors.length}
        bronceCount={allSponsors.length}
        link={false}
      />
    </>
  );
};

export default TemplateSponsoring;
