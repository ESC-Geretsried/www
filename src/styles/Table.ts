import styled from "@emotion/styled";
import { Table as AntTable } from "antd";
import { colors, dimensions, fonts } from "./variables";

export const Table = (styled(AntTable)`
  .ant-table {
    background-color: transparent;
    color: ${colors.gray.text};

    .ant-table-content {
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    .ant-table-tbody > tr:hover > td {
      background: unset;
    }
    table {
      font-size: 1rem;
      border-collapse: collapse;
      border: none;
    }
    td,
    th {
      border: none;
    }
    thead {
      border-top: ${dimensions.border.size.normal} solid ${colors.gray.line};
      border-bottom: ${dimensions.border.size.normal} solid ${colors.gray.line};
    }
  }

  .ant-table-thead > tr > th {
    background-color: transparent;

    color: ${colors.gray.text};

    font-family: ${fonts.rubikBoldItalic};
  }
  tbody tr:nth-of-type(odd) td {
    background-color: transparent;
  }
  .ant-table-tbody,
  .ant-table-thead {
    border: none;
  }
  .ant-table.ant-table-small .ant-table-tbody > tr > td,
  .ant-table.ant-table-small .ant-table-thead > tr > th {
    padding-left: 0;
  }
  & .ant-empty-description,
  & .ant-list-empty-text,
  .ant-table-empty .ant-table-tbody > tr.ant-table-placeholder {
    color: ${colors.gray.text};
  }
` as unknown) as typeof AntTable;
