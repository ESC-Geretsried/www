import { Layout } from "antd";
import styled from "@emotion/styled";
import { widths, colors, mq, grid, dimensions } from "./variables";
import { standardGrid } from "./helpers";

export const Container = styled(Layout)`
  && {
    background-color: transparent;
    margin: 0 auto;
    /* position: relative; */

    padding-top: calc(${dimensions.header.height} / 2);
    ${mq[4]} {
      max-width: inherit;
      padding: 0;
      padding-top: ${dimensions.header.height};
      display: flex;
      justify-content: center;
      width: ${widths.xl}px;
      min-width: ${widths.xl}px;
    }
  }
`;

export const StyledAntHeader = styled(Layout.Header)`
  && {
    background-color: ${colors.blue};
    color: ${colors.gray.text};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: ${dimensions.header.height};
    line-height: ${dimensions.lineHeight.h1};
    padding: ${dimensions.containerPadding / 2}rem 0;
    padding-right: ${dimensions.containerPadding}rem;
    z-index: 60;
    max-width: 100vw;

    svg {
      min-width: ${dimensions.header.height};
    }

    ${mq[4]} {
      display: none;
    }
  }
`;
// styled("div", { shouldForwardProp: isPropValid })<{ isHidden: boolean }>
export const MenuWrapper = styled.div`
  && {
    // -webkit-overflow-scrolling: touch;
    z-index: 50;
    background-color: ${colors.blue};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    flex: none !important;
    padding: ${dimensions.containerPadding}em;
    padding-top: ${dimensions.header.height};

    width: 100vw !important;
    min-width: 100vw !important;
    max-width: 100vw !important;
    // overflow-y: scroll;
    // overflow-x: hidden;
    overflow: scroll;
    transition: transform 0.3s ease-in ${mq[2]} {
      // padding-left: 20%;
      // display: flex;
      // justify-content: center;
    }

    ${mq[4]} {
      background-color: transparent;
      display: block;

      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      min-height: 100vh;
      width: calc(${widths.xl}px * 0.2) !important;
      min-width: calc(${widths.xl}px * 0.2) !important;
      max-width: calc(${widths.xl}px * 0.2) !important;
      min-height: inherit;
      padding: 4rem 0;

      flex: none !important;

      margin-left: calc((100% - ${widths.xl}px) / 2);

      margin-top: 0;

      transform: none;
    }
  }
`;

export const ContentWrapper = styled(Layout.Content)`
  ${standardGrid}
  padding: ${dimensions.containerPadding}em;
  align-content: start;
  ${mq[4]} {
    max-width: ${widths.xl}px;
    padding-left: calc(${widths.xl}px * 0.2 + ${grid.gap});
    /* margin-left: ${grid.gap}; */
    /* grid-template-columns: repeat(10, 1fr); */
  }
  /* ${mq[5]} {
    max-width: ${widths.xxl}px;
    padding-left: calc(${widths.xxl}px * 0.2 + ${grid.gapBig});
    } */

`;

export const FooterWrapper = styled(Layout.Footer)`
  align-self: flex-end;
  grid-column: 1 / -1;
  padding: 2em 0;
  border-top: ${dimensions.border.size.normal} solid ${colors.gray.line};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${grid.gap};
  row-gap: calc(${grid.gap} * 2);
  margin-top: 5rem;
  line-height: 2em;
  ${mq[4]} {
    line-height: inherit;
    row-gap: ${grid.gap};
    display: grid;
    grid-template-columns: repeat(10, 1fr);
  }
  && {
    background-color: transparent;
    color: ${colors.gray.text};
  }
`;
