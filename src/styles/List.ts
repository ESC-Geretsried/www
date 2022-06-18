import { List as AntList } from "antd";
import styled from "@emotion/styled";
import { colors, dimensions, fonts } from "./variables";

export const List = (styled(AntList)`
  border: none;
  color: ${colors.gray.text};

  .ant-list-pagination {
    margin: 3em 0;
    display: flex;
    justify-content: center;
    & .ant-pagination-item-link,
    & .ant-pagination-item {
      background-color: transparent;
      border: ${dimensions.border.size.normal} solid ${colors.gray.line};
      color: ${colors.gray.text};
      border-radius: 0;
      min-width: 3em;
      font-family: ${fonts.PTSansBold};
      a {
        text-decoration: none;
        color: ${colors.gray.text};
      }
    }
    & .ant-pagination-item-active,
    & .ant-pagination-item-active a {
      color: ${colors.gold};
      border-color: ${colors.gold};
    }
    & .ant-pagination-disabled {
      opacity: 0.5;
    }
  }
  & .ant-empty-description,
  & .ant-empty-normal,
  & .ant-list-empty-text {
    color: ${colors.gray.text};
  }
` as unknown) as typeof AntList;

export const ListItem = styled(AntList.Item)`
  &&& {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: calc(1.5em + ${dimensions.border.size.normal});
    flex-direction: column;
    align-items: flex-start;

    border-bottom: ${dimensions.border.size.small} solid ${colors.gray.line};
    &&&:first-of-type {
      padding-top: 0;
      h3 {
        margin-top: 0;
      }
    }
    &&&:last-of-type {
      border-bottom: none;
    }
  }
  position: relative;
  a {
    position: relative;
    z-index: 1;
    border: none;
  }
`;
