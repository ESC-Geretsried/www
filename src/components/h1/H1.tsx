import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors, dimensions } from "../../styles/variables";

type HeaderSize = "big" | "section";

const Wrapper = styled.div<{ size: HeaderSize }>`
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  ${({ size }) => {
    switch (size) {
      case "big":
        return css`
          justify-content: center;

          padding: 4em 0;
        `;
      case "section":
        return css`
          justify-content: flex-start;
          padding: 1em 0;
          padding-top: 0;
        `;
      default:
        return "";
    }
  }};
`;

const Borders = styled.div<{ size: HeaderSize }>`
  ${({ size }) => {
    switch (size) {
      case "big":
        return css`
          text-align: center;
          justify-content: center;
          display: flex;
        `;
      case "section":
        return css``;
      default:
        return "";
    }
  }}
  h1 {
    text-transform: uppercase;
    border-top: ${dimensions.border.size.big} solid ${colors.gray.line};
    border-bottom: ${dimensions.border.size.big} solid ${colors.gray.line};
    margin-bottom: 0em;
    hyphens: auto;
    padding: 0.25em 0;
    ${({ size }) => {
      switch (size) {
        case "big":
          return css`
            text-align: center;
          `;
        case "section":
          return css`
            text-align: left;
            font-size: ${dimensions.headingSizes.h1Smaller};
            padding: 0.3em 0;
            border-width: ${dimensions.border.size.normal};
          `;
        default:
          return "";
      }
    }};
  }
`;

const H1: React.FC<{ title: string; size: HeaderSize; className?: string }> = ({
  title,
  size = "big",
  children,
  ...rest
}) => {
  return (
    <Wrapper size={size} {...rest}>
      <Borders size={size}>
        <h1
          lang="de"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: title === "Förderverein" ? "Verein zur Förderung des Eishockeysports in Geretsried e.V." : title,
          }}
        />
      </Borders>
    </Wrapper>
  );
};

export default H1;
