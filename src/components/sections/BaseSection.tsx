import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { mq } from "../../styles/variables";

type SectionSize = "small" | "big" | "full" | "half";
const Section = styled.section<{ size: SectionSize; row?: number }>`
  /* min-height: 40vh; */
  max-width: 100%;
  grid-column: 1 / -1;
  ${mq[2]} {
    ${({ size }) => {
      switch (size) {
        case "full":
          return css`
            grid-column: 1 / -1;
          `;
        case "big":
          return css`
            grid-column: 4 / span 7;
          `;
        case "small":
          return css`
            grid-column: 1 / span 3;
          `;
        case "half":
          return css`
            grid-column: span 5;
          `;
        default:
          return "";
      }
    }}
    ${({ row }) => (row === undefined ? "" : `grid-row: ${row};`)}
  }
`;

const BaseSection: React.FC<{ size?: SectionSize; row?: number; className?: string }> = ({
  size = "full",
  row,
  children,
  ...rest
}) => {
  return (
    <Section {...rest} size={size} row={row}>
      {children}
    </Section>
  );
};

export default BaseSection;
