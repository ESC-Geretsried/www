import styled from "@emotion/styled";
import { standardGrid } from "../../styles/helpers";
import { grid, mq } from "../../styles/variables";
import H2 from "../h2/H2";
import BaseSection from "../sections/BaseSection";

export const Section = styled(BaseSection)`
  ${standardGrid}
  grid-template-rows: 1fr;
  margin-bottom: 5rem;
`;
export const StyledH2 = styled(H2)`
  width: auto;
  justify-self: center;
`;

export const PlayersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${grid.gap};
  grid-column: 1/ -1;
  margin: 0 12.5vw;
  ${mq[4]} {
    margin: 0;
    grid-template-columns: repeat(6, 1fr);
    gap: calc(${grid.gap} * 2);
  }
`;

export const CardWrapper = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 5rem;

  ${mq[2]} {
    grid-column: span 2;
    padding: 0 5rem;
  }
  ${mq[4]} {
    padding: 0;
  }
  .gatsby-image-wrapper {
    margin: 0 auto;
    min-height: 173px;
    min-width: 152px;
  }
`;
