import React from "react";
import styled from "@emotion/styled";
import { colors, dimensions } from "../../styles/variables";

const Wrapper = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 1em 0;
  padding-top: 0;
`;

const Borders = styled.div`
  /* width: 100%; */

  h2 {
    text-transform: uppercase;
    border-top: ${dimensions.border.size.big} solid ${colors.gray.line};
    border-bottom: ${dimensions.border.size.big} solid ${colors.gray.line};
    margin-bottom: 0;
    margin-top: 0;
    hyphens: auto;
    padding: 0.25em 0;
    text-align: left;
    /* font-size: ${dimensions.headingSizes.h1Smaller}; */
    padding: 0.3em 0;
    border-width: ${dimensions.border.size.normal};
  }
`;

const H2: React.FC<{ title: string; className?: string }> = ({ title, children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <Borders>
        <h2 lang="de">{title}</h2>
      </Borders>
    </Wrapper>
  );
};

export default H2;
