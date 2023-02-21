import React from "react";
import { css } from "@emotion/react";
import { StyledAntHeader } from "../../styles/Container";
import Burger from "../burger/Burger";
import Logo from "../logo/Logo";
import Link from "../link/Link";
import { dimensions } from "../../styles/variables";

const MobileHeader: React.FC<{ isActive: boolean; onClick: () => void; title: string }> = ({
  isActive,
  onClick,
  title,
  ...rest
}) => {
  return (
    <StyledAntHeader {...rest}>
      <Burger onClick={onClick} isActive={isActive} />
      <h1
        css={css`
          font-size: 1.3rem;
          margin: 0;
          text-align: center;
          text-transform: uppercase;
        `}
      >
        {title}
      </h1>
      <Link
        to="/"
        css={css`
          max-height: ${dimensions.header.height};
          svg {
            padding: 0.5em;
            max-height: ${dimensions.header.height};
          }
        `}
      >
        <Logo size="small" />
      </Link>
    </StyledAntHeader>
  );
};

export default MobileHeader;
