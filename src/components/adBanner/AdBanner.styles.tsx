import styled from "@emotion/styled";
import { colors, dimensions, mq } from "../../styles/variables";

export const AdBannerWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  background-color: ${colors.blue};
  z-index: 15;
  margin-top: ${dimensions.header.height};
  ${mq[4]} {
    position: fixed;
    margin-top: 0;
  }
  .ant-carousel .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

export const AdLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export const SponsorName = styled.h6`
  margin: 0;
  text-transform: uppercase;
  text-align: center;
`;

export const AdbannerImageWrapper = styled.div<{ aspectRatio: number }>`
  min-width: ${({ aspectRatio }) => (aspectRatio > 1.5 ? 80 : 40)}px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: relative; */
  background-color: white;
  .gatsby-image-wrapper {
    /* display: inline-block;
    margin: 2%;*/
    min-width: ${({ aspectRatio }) => (aspectRatio > 1.5 ? 70 : 35)}px;
    min-height: 35px;
  }
`;
