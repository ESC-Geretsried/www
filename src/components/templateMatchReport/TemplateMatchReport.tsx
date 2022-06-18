import React from "react";
import { css } from "@emotion/react";
import { BlogPostFieldsFragment } from "../../../graphql-types";
import BaseSection from "../sections/BaseSection";
import { mq, dimensions, colors } from "../../styles/variables";
import H1 from "../h1/H1";
// import WPContentContainer from "../wpContentContainer/WPContentContainer";
import { DataEntry } from "../dataEntry/DataEntry";
import WPContentContainer from "../wpContentContainer/WPContentContainer";

const MatchReportHeader: React.FC<{ post: BlogPostFieldsFragment }> = ({ post }) => {
  const matchReport = post.postACF?.matchReport;

  return (
    <div
      css={css`
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        flex-direction: column;
      `}
    >
      <div>
        <span>{new Date(matchReport?.gameDay ?? "").toLocaleDateString(["de-DE"])}</span>
        <div
          css={css`
            border-bottom: ${dimensions.border.size.big} solid ${colors.gray.line};
            border-top: ${dimensions.border.size.big} solid ${colors.gray.line};
            padding: 0.5rem;
            margin: 0.5rem 0;
            h1 {
              ${mq[4]} {
                font-size: 5rem;
              }
              margin-bottom: 0;
            }
          `}
        >
          <h1>
            <span>{matchReport?.teamHomeSlug}</span>
            <span>-</span>
            <span>{matchReport?.teamGuestSlug}</span>
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <span>{matchReport?.teamHome}</span>
            <span>{matchReport?.teamGuest}</span>
          </div>
        </div>
        <h2
          css={css`
            text-align: center;
            font-size: ${dimensions.headingSizes.h1Smaller};
            ${mq[4]} {
              font-size: 3rem;
            }
          `}
        >
          <span>{matchReport?.scoreHome ?? "0"}</span>
          <span>:</span>
          <span>{matchReport?.scoreGuest ?? "0"}</span>
          {matchReport?.specialCase && (
            <span>
              &nbsp;
              {matchReport.specialCase === "overtime" && "OT"}
              {matchReport.specialCase === "penalty" && "n.P"}
              {matchReport.specialCase === "abort" && (
                <>
                  <br />
                  vor Spielabbruch
                </>
              )}
            </span>
          )}
        </h2>
      </div>
    </div>
  );
};

const TemplateMatchReport: React.FC<{ post: BlogPostFieldsFragment }> = ({ post }) => {
  return (
    <>
      <MatchReportHeader post={post} />
      <BaseSection size="small">
        <H1 size="section" title="Stats" />
        <DataEntry datakey="Tore: " data={post.postACF?.matchReport?.scorer} />
        <DataEntry datakey="Zwischenstände: " data={post.postACF?.matchReport?.periodResults} />
        <DataEntry datakey="Beihilfen: " data={post.postACF?.matchReport?.assists} />
        <DataEntry datakey="Strafen: " data={post.postACF?.matchReport?.penalties} />
        <DataEntry datakey="Zuschauer: " data={post.postACF?.matchReport?.spectators} />
      </BaseSection>
      <BaseSection size="big">
        <H1 title={post.title ?? ""} size="section" />
        <WPContentContainer wpContent={post.content ?? "Es wurde kein Inhalt gefunden!"} />
        <div
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-top: 0.5em;
            border-top: ${dimensions.border.size.small} solid ${colors.gray.line};
          `}
        >
          {/* <div>
            <span>Autor: </span>
            <span>{post?.author?.name}</span>
          </div> */}
          <div>
            <span>veröffentlicht am: {new Date(post.date ?? "").toLocaleDateString(["de-DE"])}</span>
          </div>
        </div>
      </BaseSection>
    </>
  );
};

export default TemplateMatchReport;
