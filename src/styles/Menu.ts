import { Menu } from "antd";
import styled from "@emotion/styled";
import { colors, fonts, dimensions, mq } from "./variables";

export const StyledAntMenu = styled(Menu)`
  a {
    text-decoration: none;
  }
  &&&.ant-menu,
  .ant-menu-submenu > .ant-menu {
    background-color: inherit;
  }
  color: ${colors.gray.text};
  margin: 1em 0;
  border: none;

  ${mq[2]} {
    margin: 3em auto;
    margin-top: 1em;
    border-top: ${dimensions.border.size.normal} solid ${colors.gray.line};
  }
  border-bottom: ${dimensions.border.size.normal} solid ${colors.gray.line};
  font-family: ${fonts.rubikBold};
  font-size: ${dimensions.fontSize.regular}px;
  font-style: italic;
  .ant-menu-submenu-title {
    padding-left: 0 !important;
    text-transform: uppercase;
    height: ${dimensions.menuItem.height} !important;
    line-height: ${dimensions.menuItem.height} !important;
    &:hover {
      color: ${colors.gold};
    }
  }
  .ant-menu-item {
    font-family: ${fonts.PTSans};
    color: ${colors.gray.text};
    padding-left: 0 !important;
    &:active {
      background-color: transparent;
    }
  }
  &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: inherit;
    &::after {
      display: none;
    }
  }
  .ant-menu-item-active,
  .ant-menu-submenu-active {
    color: ${colors.gold};
  }
  .ant-menu-submenu-arrow {
    display: none;
  }
  .ant-menu-inline,
  .ant-menu-item {
    width: auto;
  }
  .ant-menu-sub.ant-menu-inline {
    padding-left: 1.5rem;
  }
  .ant-menu-submenu-title:active {
    background-color: transparent;
  }
`;

export const StyledAntSubMenuItem = styled(Menu.Item)`
  &&& {
    font-family: ${fonts.PTSans};
    height: calc(${dimensions.menuItem.height} / 2);
    line-height: calc(${dimensions.menuItem.height} / 2);
    position: relative;

    a {
      text-transform: none;
    }
  }
`;

export const StyledAntMenuItem = styled(Menu.Item)`
  &&& {
    position: relative;
    font-family: ${fonts.rubikBold};
    height: ${dimensions.menuItem.height};
    line-height: ${dimensions.menuItem.height};
  }
`;
