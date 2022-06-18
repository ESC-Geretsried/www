import * as React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useStaticQuery, graphql } from "gatsby";
import Link from "../link/Link";
import { heights, dimensions, colors } from "../../styles/variables";
import { LogoQuery } from "../../../graphql-types";

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.blue};
  grid-column: 3 / -1;
`;

const HeaderInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const data = useStaticQuery<LogoQuery>(graphql`
    query Logo {
      file(name: { eq: "logo" }) {
        childImageSharp {
          fixed(width: 50) {
            src
          }
        }
      }
    }
  `);

  return (
    <StyledHeader>
      <HeaderInner>
        {data?.file?.childImageSharp?.fixed?.src && (
          <HomepageLink
            css={css`
              margin-right: auto;
            `}
            to="/"
          >
            <img
              src={data.file.childImageSharp.fixed.src}
              css={css`
                width: 40px;
                height: 40px;
              `}
              alt="alt"
            />
          </HomepageLink>
        )}
        {title}
      </HeaderInner>
    </StyledHeader>
  );
};

export default Header;
