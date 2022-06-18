import styled from "@emotion/styled";
import React from "react";
import { Button as AntButton } from "antd";
import { colors, dimensions } from "../../styles/variables";

const StyledButton = styled(AntButton)`
  margin: 0;
  padding: 0.25em 0.75em;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;

  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;
  border: ${dimensions.border.size.small} solid ${colors.gray.line};
  border-radius: 0;

  &:hover {
    background: transparent;
    color: ${colors.gold};
    border-color: ${colors.gold};
  }
`;

const Button: React.FC<{ onClick: () => void }> = ({ onClick, children, ...rest }) => {
  return (
    <StyledButton onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
