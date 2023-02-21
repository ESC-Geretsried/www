import React from "react";
import { css } from "@emotion/react";
import { PageFieldsFragment } from "../../../graphql-types";
import BaseSection from "../sections/BaseSection";
import H2 from "../h2/H2";
import { standardGrid } from "../../styles/helpers";
import { dimensions, colors, mq } from "../../styles/variables";
import TicketTable from "./TicketTable";

const TemplateTickets: React.FC<{ data: PageFieldsFragment }> = ({ data, ...rest }) => {
  if (!data.pageACF?.ticketsContent) {
    return null;
  }

  const { standing, seating, season, seasonpass, suffix } = data.pageACF.ticketsContent;

  return (
    <>
      <BaseSection
        size="full"
        css={css`
          ${standardGrid}
        `}
      >
        <BaseSection size="big">
          <strong>Eintrittspreise zu den Spielen der River Rats</strong>
          <p>{season}</p>
        </BaseSection>
        <H2
          title="Stehplatz"
          css={css`
            ${mq[2]} {
              grid-column: span 3;
            }
          `}
        />
        {standing && <TicketTable tickets={standing} />}
        <H2
          title="Sitzplatz"
          css={css`
            ${mq[2]} {
              grid-column: span 3;
            }
          `}
        />
        {seating && <TicketTable tickets={seating} />}
        <H2
          title="Saisonkarten"
          css={css`
            ${mq[2]} {
              grid-column: span 3;
            }
          `}
        />
        <BaseSection size="big">
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: seasonpass?.description ?? "" }} />
          <div
            css={css`
              display: flex;
              justify-content: space-around;
            `}
          >
            {seasonpass?.applications?.map((application) => {
              return (
                <div
                  key={application?.title ?? ""}
                  css={css`
                    a {
                      padding: 0.25em 0.5em;
                      border: ${dimensions.border.size.normal} solid ${colors.gray.line};

                      text-decoration: none;
                    }
                  `}
                >
                  <strong>{application?.title}</strong> <br />
                  <br />
                  <a href={application?.application?.mediaItemUrl ?? ""} download>
                    Download
                  </a>
                </div>
              );
            })}
          </div>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: suffix ?? "" }}
            css={css`
              margin-top: 5rem;
            `}
          />
        </BaseSection>
      </BaseSection>
    </>
  );
};

export default TemplateTickets;
