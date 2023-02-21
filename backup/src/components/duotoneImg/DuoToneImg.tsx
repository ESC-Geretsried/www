import React from "react";
import styled from "@emotion/styled";

const DuoToneOuter = styled.div`
  position: relative;
  .duotone-original-children {
    opacity: 0;
    transition: opacity 0.2s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 0;
  }
`;

const DuoToneDiv = styled.div`
  filter: url("#duotone");
`;

const DuoToneWrapper: React.FC<{ firstColor?: string; secondColor?: string; className?: string }> = ({
  firstColor,
  secondColor,
  children,
  ...rest
}) => {
  return (
    <DuoToneOuter {...rest}>
      <DuoToneDiv>{children}</DuoToneDiv>
      <div className="duotone-original-children">{children}</div>
    </DuoToneOuter>
  );
};

export default DuoToneWrapper;
