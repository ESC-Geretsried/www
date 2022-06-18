import React from "react";
import styled from "@emotion/styled";
import { grid } from "../../styles/variables";

const OuterDiv = styled.div<{ ratio: number }>`
  position: relative;
  padding-top: calc(${({ ratio }) => ratio * 100}% - ${({ ratio }) => (ratio !== 1 ? `calc(${grid.gap} / 2)` : "0%")});
`;
const InnerDiv = styled.div<{ ratio: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const MostInnerDiv = styled.div`
  position: relative;
`;

const AspectRatioContainer: React.FC<{ ratio?: number; className?: string }> = ({ ratio = 1, children, ...rest }) => {
  return (
    <div>
      <OuterDiv ratio={ratio}>
        <InnerDiv ratio={ratio}>
          <MostInnerDiv {...rest}>{children}</MostInnerDiv>
        </InnerDiv>
      </OuterDiv>
    </div>
  );
};

export default AspectRatioContainer;
