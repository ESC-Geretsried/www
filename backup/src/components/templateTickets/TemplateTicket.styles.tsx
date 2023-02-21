import styled from "@emotion/styled";
import { grid } from "../../styles/variables";

export const TableWrapper = styled.div`
  grid-column: span 5;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: ${grid.gap};
  margin-bottom: 5rem;
`;
