import React from "react";
import { css } from "@emotion/react";
import { colors, fonts } from "../../styles/variables";

const EventDayHeader: React.FC<{ date: Date; isWeekdayHeader?: boolean }> = ({ date, isWeekdayHeader, ...rest }) => {
  return (
    <h3
      {...rest}
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 0;
        margin-top: 0;
        font-family: ${fonts.rubikBold};
        font-size: 1rem;
        padding: 1.5em 0;
        padding-bottom: 0.5em;
        border-bottom: 2px solid ${colors.white};
        span {
          display: inline-block;
        }
      `}
    >
      <span>{isWeekdayHeader ? "Montag-Donnerstag" : date.toLocaleDateString(["de-DE"], { weekday: "long" })}</span>
      {!isWeekdayHeader && (
        <span>{date.toLocaleDateString(["de-DE"], { day: "numeric", month: "numeric", year: "2-digit" })}</span>
      )}
    </h3>
  );
};

export default EventDayHeader;
