import React from "react";
import { css } from "@emotion/react";

export const DataEntry: React.FC<{ datakey: string; data?: string | null; rightAlign?: boolean }> = ({
  datakey,
  data,
  rightAlign = false,
}) => {
  if (data === null || data === undefined) {
    return null;
  }

  return (
    <div
      css={css`
        width: 100%;
        margin-bottom: 0.5em;
        a {
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }
      `}
    >
      {rightAlign && (
        <>
          <strong>{datakey}&nbsp;</strong>
          <span
            css={css`
              float: right;
            `}
          >
            {data}
          </span>
        </>
      )}
      {!rightAlign && datakey.toLowerCase() !== "email" && datakey.toLowerCase() !== "telefon" && (
        <>
          <strong>{datakey}&nbsp;</strong>
          <br />
          <span>{data}</span>
        </>
      )}
      {datakey.toLowerCase() === "email" && (
        <>
          <strong
            css={css`
              /* margin-top: 0.5em;
              width: 100%; */
            `}
          >
            {datakey}
          </strong>
          <br />
          <a href={`mailto:${data}`}>{data}</a>
        </>
      )}
      {datakey.toLowerCase() === "telefon" && (
        <>
          <strong
            css={css`
              /* margin-top: 0.5em;
              width: 100%; */
            `}
          >
            {datakey}&nbsp;
          </strong>
          <br />
          <a href={`tel:${data}`}>{data}</a>
        </>
      )}
    </div>
  );
};
