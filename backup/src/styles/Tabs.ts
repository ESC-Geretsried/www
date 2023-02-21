import styled from "@emotion/styled";
import { Tabs as AntTabs } from "antd";
import { colors, mq, fonts, dimensions } from "./variables";
import { standardGrid } from "./helpers";

export const Tabs = styled(AntTabs)`
  color: ${colors.gray.text};

  ${standardGrid}

  .ant-tabs-nav {
    grid-column: 1 / span 2;
    ${mq[2]} {
      grid-column: 1/-1;
    }
    font-family: ${fonts.rubikBoldItalic};
    border-top: ${dimensions.border.size.normal} solid ${colors.gray.line};
    &::before {
      border-bottom: none;
    }
  }

  .ant-tabs-ink-bar,
  &&.ant-tabs-top > .ant-tabs-nav .ant-tabs-ink-bar {
    height: ${dimensions.border.size.normal};
    background-color: ${colors.gray.line};
    display: none;
    ${mq[2]} {
      display: block;
    }
  }
  .ant-tabs-tab {
    opacity: 0.5;
    text-transform: uppercase;
    transition: opacity 0.3s;
    margin-right: 1em;
    ${mq[4]} {
      margin-right: 2em;
    }
    &:hover {
      color: ${colors.gold};
    }
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
  .ant-tabs-tab.ant-tabs-tab-active {
    color: ${colors.gray.line};
    opacity: 1;
  }
  .ant-tabs-content-holder {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  &&&.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
    flex-direction: column;
    ${mq[2]} {
      flex-direction: row;
    }
  }
`;

export const TabPane = styled(AntTabs.TabPane)`
  ${standardGrid}
  grid-column: 1 / -1;
  color: ${colors.gray.text};
`;
